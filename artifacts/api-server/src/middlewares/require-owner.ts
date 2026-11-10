import type { NextFunction, Request, Response } from "express";

export function requireOwner(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.admin) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  if (req.admin.role !== "owner") {
    res.status(403).json({ error: "Owner permission required" });
    return;
  }

  next();
}