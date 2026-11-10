
import { and, desc, eq } from "drizzle-orm";
import { Router, type IRouter } from "express";
import { products, db } from "@workspace/db";
import { requireAdmin } from "../middlewares/require-admin";

const router: IRouter = Router();

// Public: list active products
router.get("/products", async (_req, res) => {
  try {
    const data = await db
      .select()
      .from(products)
      .where(eq(products.isActive, true))
      .orderBy(desc(products.createdAt));

    res.json({ products: data });
  } catch {
    res.status(500).json({ error: "Unable to fetch products" });
  }
});

// Admin: list all products, including inactive ones
router.get("/admin/products", requireAdmin, async (_req, res) => {
  try {
    const data = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt));

    res.json({ products: data });
  } catch {
    res.status(500).json({ error: "Unable to fetch products" });
  }
});

// Admin: create product
router.post("/admin/products", requireAdmin, async (req, res) => {
  const { name, category, description, price, imageUrl, isActive } = req.body ?? {};

  if (
    typeof name !== "string" || !name.trim() ||
    typeof category !== "string" || !category.trim() ||
    (description !== undefined && typeof description !== "string") ||
    (price !== undefined && price !== null && typeof price !== "string") ||
    (imageUrl !== undefined && imageUrl !== null && typeof imageUrl !== "string") ||
    (isActive !== undefined && typeof isActive !== "boolean")
  ) {
    res.status(400).json({ error: "Invalid product data" });
    return;
  }

  try {
    const [created] = await db.insert(products).values({
      name: name.trim(),
      category: category.trim(),
      description: description?.trim() ?? "",
      price: price?.trim() || null,
      imageUrl: imageUrl?.trim() || null,
      ...(isActive !== undefined ? { isActive } : {}),
    }).returning();

    res.status(201).json({ product: created });
  } catch {
    res.status(500).json({ error: "Unable to create product" });
  }
});

// Admin: update product
router.put("/admin/products/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const { name, category, description, price, imageUrl, isActive } = req.body ?? {};

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid product ID" });
    return;
  }

  const updates: Partial<typeof products.$inferInsert> = {};

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      res.status(400).json({ error: "Invalid product name" });
      return;
    }
    updates.name = name.trim();
  }

  if (category !== undefined) {
    if (typeof category !== "string" || !category.trim()) {
      res.status(400).json({ error: "Invalid category" });
      return;
    }
    updates.category = category.trim();
  }

  if (description !== undefined) {
    if (typeof description !== "string") {
      res.status(400).json({ error: "Invalid description" });
      return;
    }
    updates.description = description.trim();
  }

  if (price !== undefined) {
    if (price !== null && typeof price !== "string") {
      res.status(400).json({ error: "Invalid price" });
      return;
    }
    updates.price = typeof price === "string" ? price.trim() || null : null;
  }

  if (imageUrl !== undefined) {
    if (imageUrl !== null && typeof imageUrl !== "string") {
      res.status(400).json({ error: "Invalid image URL" });
      return;
    }
    updates.imageUrl = typeof imageUrl === "string" ? imageUrl.trim() || null : null;
  }

  if (isActive !== undefined) {
    if (typeof isActive !== "boolean") {
      res.status(400).json({ error: "Invalid active status" });
      return;
    }
    updates.isActive = isActive;
  }

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No valid fields supplied" });
    return;
  }

  updates.updatedAt = new Date();

  try {
    const [updated] = await db.update(products)
      .set(updates)
      .where(eq(products.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json({ product: updated });
  } catch {
    res.status(500).json({ error: "Unable to update product" });
  }
});

// Admin: delete product
router.delete("/admin/products/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid product ID" });
    return;
  }

  try {
    const [deleted] = await db.delete(products)
      .where(eq(products.id, id))
      .returning({ id: products.id });

    if (!deleted) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json({ success: true, id: deleted.id });
  } catch {
    res.status(500).json({ error: "Unable to delete product" });
  }
});

export default router;
