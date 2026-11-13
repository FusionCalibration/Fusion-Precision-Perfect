import { createHash } from "node:crypto";
import { and, eq, gt } from "drizzle-orm";
import type { NextFunction, Request, Response } from "express";
import { admins, adminSessions, db } from "@workspace/db";

const SESSION_COOKIE = "fpp_admin_session";

export type AuthenticatedAdmin = {
  id: number;
  email: string;
  name: string;
  role: string;
  welcomeMessage: string | null;
};

declare global {
  namespace Express {
    interface Request {
      admin?: AuthenticatedAdmin;
    }
  }
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const rawToken = req.cookies?.[SESSION_COOKIE];
  if (typeof rawToken !== "string" || rawToken.length < 40) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  try {
    const tokenHash = createHash("sha256").update(rawToken).digest("hex");
    const [session] = await db
      .select({
        sessionId: adminSessions.id,
        id: admins.id,
        email: admins.email,
        name: admins.name,
        role: admins.role,
        welcomeMessage: admins.welcomeMessage,
      })
      .from(adminSessions)
      .innerJoin(admins, eq(adminSessions.adminId, admins.id))
      .where(and(
        eq(adminSessions.tokenHash, tokenHash),
        gt(adminSessions.expiresAt, new Date()),
        eq(admins.isActive, true),
      ))
      .limit(1);

    if (!session) {
      res.status(401).json({ error: "Session expired or invalid" });
      return;
    }

    req.admin = {
      id: session.id,
      email: session.email,
      name: session.name,
      role: session.role,
      welcomeMessage: session.welcomeMessage,
    };
    await db.update(adminSessions)
      .set({ lastSeenAt: new Date() })
      .where(eq(adminSessions.id, session.sessionId));
    next();
    } catch (error) {
    console.error("Admin verification failed:", error);
    res.status(500).json({ error: "Unable to verify admin access" });
  }
}
