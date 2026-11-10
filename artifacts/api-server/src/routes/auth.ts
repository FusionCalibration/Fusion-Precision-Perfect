import { createHash, randomBytes } from "node:crypto";
import { OAuth2Client } from "google-auth-library";
import { and, eq } from "drizzle-orm";
import { Router, type IRouter, type Request, type Response } from "express";
import { admins, adminSessions, db } from "@workspace/db";
import { requireAdmin } from "../middlewares/require-admin";

const router: IRouter = Router();
const googleClient = new OAuth2Client();
const SESSION_COOKIE = "fpp_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const isProduction = process.env.NODE_ENV === "production";

function getAllowedOrigins(): Set<string> {
  const configured = (process.env.FRONTEND_ORIGIN ?? "https://fusionprecisionperfect.com")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (!isProduction) {
    configured.push("http://localhost:5173", "http://127.0.0.1:5173");
  }
  return new Set(configured);
}

function requestHasAllowedOrigin(req: Request): boolean {
  const origin = req.get("origin");
  // Non-browser clients may omit Origin. Browser requests must match the allowlist.
  return !origin || getAllowedOrigins().has(origin);
}

function cookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ("none" as const) : ("lax" as const),
    path: "/api",
    maxAge: SESSION_TTL_MS,
  };
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function clearSessionCookie(res: Response): void {
  res.clearCookie(SESSION_COOKIE, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/api",
  });
}

function rejectBadOrigin(req: Request, res: Response): boolean {
  if (requestHasAllowedOrigin(req)) return false;
  res.status(403).json({ error: "Origin not allowed" });
  return true;
}

router.post("/auth/google", async (req, res) => {
  if (rejectBadOrigin(req, res)) return;

  const credential = req.body?.credential;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    res.status(503).json({ error: "Google sign-in is not configured" });
    return;
  }
  if (typeof credential !== "string" || credential.length < 20 || credential.length > 10000) {
    res.status(400).json({ error: "A valid Google credential is required" });
    return;
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const email = payload?.email?.trim().toLowerCase();

    if (!email || payload?.email_verified !== true) {
      res.status(401).json({ error: "Google account could not be verified" });
      return;
    }

    const [admin] = await db
      .select({
        id: admins.id,
        email: admins.email,
        name: admins.name,
        role: admins.role,
        welcomeMessage: admins.welcomeMessage,
        isActive: admins.isActive,
      })
      .from(admins)
      .where(and(eq(admins.email, email), eq(admins.isActive, true)))
      .limit(1);

    if (!admin) {
      res.status(403).json({ error: "This Google account is not authorised for administration" });
      return;
    }

    const rawToken = randomBytes(32).toString("base64url");
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

    await db.insert(adminSessions).values({
      adminId: admin.id,
      tokenHash,
      expiresAt,
    });

    res.cookie(SESSION_COOKIE, rawToken, cookieOptions());
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        welcomeMessage: admin.welcomeMessage,
      },
    });
  } catch {
    res.status(401).json({ error: "Google sign-in could not be completed" });
  }
});

router.get("/auth/me", requireAdmin, (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.json({ admin: req.admin });
});

router.post("/auth/logout", async (req, res) => {
  if (rejectBadOrigin(req, res)) return;
  const rawToken = req.cookies?.[SESSION_COOKIE];

  try {
    if (typeof rawToken === "string" && rawToken.length >= 40) {
      await db.delete(adminSessions)
        .where(eq(adminSessions.tokenHash, hashToken(rawToken)));
    }
    clearSessionCookie(res);
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Unable to end the admin session" });
  }
});

export default router;
