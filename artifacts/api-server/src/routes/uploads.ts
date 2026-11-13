import { Router, type IRouter } from "express";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "../middlewares/require-admin";

const router: IRouter = Router();

router.post("/admin/uploads/signature", requireAdmin, (_req, res) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    res.status(500).json({ error: "Image storage is not configured" });
    return;
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "fusion-precision-perfect/products";

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    apiSecret,
  );

  res.json({ cloudName, apiKey, timestamp, folder, signature });
});

export default router;