
import { useCallback, useEffect, useState } from "react";
import { customFetch } from "@workspace/api-client-react";

type Product = {
    id: number;
    name: string;
    category: string;
    description: string;
    price: string | null;
    imageUrl: string | null;
    isActive: boolean;
    createdAt: string;
};

type ProductForm = {
    name: string;
    category: string;
    description: string;
    price: string;
    imageUrl: string;
    isActive: boolean;
};

type UploadSignature = {
    cloudName: string;
    apiKey: string;
    timestamp: number;
    folder: string;
    signature: string;
};

const emptyForm: ProductForm = {
    name: "",
    category: "",
    description: "",
    price: "",
    imageUrl: "",
    isActive: true,
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [form, setForm] = useState<ProductForm>(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    useEffect(() => {
        if (!selectedImage) {
            setPreviewUrl("");
            return;
        }

        const objectUrl = URL.createObjectURL(selectedImage);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedImage]);

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const result = await customFetch<{ products: Product[] }>(
                "/api/admin/products",
                { responseType: "json" },
            );
            setProducts(result.products);
        } catch {
            setError("Could not load products. Please refresh and try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadProducts();
    }, [loadProducts]);

    function updateField<K extends keyof ProductForm>(
        key: K,
        value: ProductForm[K],
    ) {
        setForm((current) => ({ ...current, [key]: value }));
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) return;

        setError("");
        setNotice("");

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            event.target.value = "";
            return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            setError("Image size must not exceed 5 MB.");
            event.target.value = "";
            return;
        }

        setSelectedImage(file);
    }

    function startEditing(product: Product) {
        setEditingId(product.id);
        setSelectedImage(null);
        setForm({
            name: product.name,
            category: product.category,
            description: product.description ?? "",
            price: product.price ?? "",
            imageUrl: product.imageUrl ?? "",
            isActive: product.isActive,
        });
        setNotice("");
        setError("");
    }

    function resetForm() {
        setEditingId(null);
        setSelectedImage(null);
        setForm(emptyForm);
    }

    async function uploadImage(file: File): Promise<string> {
        const signature = await customFetch<UploadSignature>(
            "/api/admin/uploads/signature",
            {
                method: "POST",
                responseType: "json",
            },
        );

        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("api_key", signature.apiKey);
        uploadData.append("timestamp", String(signature.timestamp));
        uploadData.append("folder", signature.folder);
        uploadData.append("signature", signature.signature);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
            {
                method: "POST",
                body: uploadData,
            },
        );

        if (!response.ok) {
            throw new Error("Image upload failed.");
        }

        const result = (await response.json()) as {
            secure_url?: string;
        };

        if (!result.secure_url) {
            throw new Error("Cloudinary did not return an image URL.");
        }

        return result.secure_url;
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true);
        setError("");
        setNotice("");

        try {
            let imageUrl = form.imageUrl.trim() || null;

            if (selectedImage) {
                imageUrl = await uploadImage(selectedImage);
            }

            const payload = {
                ...form,
                name: form.name.trim(),
                category: form.category.trim(),
                description: form.description.trim(),
                price: form.price.trim() || null,
                imageUrl,
            };

            if (editingId !== null) {
                await customFetch(`/api/admin/products/${editingId}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                    headers: { "Content-Type": "application/json" },
                    responseType: "json",
                });
                setNotice("Product updated.");
            } else {
                await customFetch("/api/admin/products", {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: { "Content-Type": "application/json" },
                    responseType: "json",
                });
                setNotice("Product added.");
            }

            resetForm();
            await loadProducts();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not save the product. Please try again.",
            );
        } finally {
            setSaving(false);
        }
    }

    async function toggleStatus(product: Product) {
        setError("");
        setNotice("");

        try {
            await customFetch(`/api/admin/products/${product.id}`, {
                method: "PUT",
                body: JSON.stringify({ isActive: !product.isActive }),
                headers: { "Content-Type": "application/json" },
                responseType: "json",
            });

            setNotice("Product status updated.");
            await loadProducts();
        } catch {
            setError("Could not update product status.");
        }
    }

    async function deleteProduct(product: Product) {
        if (!window.confirm(`Delete "${product.name}" permanently?`)) return;

        setError("");
        setNotice("");

        try {
            await customFetch(`/api/admin/products/${product.id}`, {
                method: "DELETE",
                responseType: "auto",
            });

            setNotice("Product deleted.");

            if (editingId === product.id) resetForm();

            await loadProducts();
        } catch {
            setError("Could not delete the product.");
        }
    }

    return (
        <section className="mt-8 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Products</h2>
                <p className="mt-1 text-sm text-slate-500">
                    Add, edit and manage products displayed on the website.
                </p>
            </div>

            {error && (
                <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </p>
            )}

            {notice && (
                <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    {notice}
                </p>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6"
            >
                <h3 className="font-semibold text-slate-900">
                    {editingId !== null ? "Edit product" : "Add a product"}
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-1 text-sm font-medium text-slate-700">
                        Product name *
                        <input
                            required
                            maxLength={150}
                            value={form.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2"
                        />
                    </label>

                    <label className="space-y-1 text-sm font-medium text-slate-700">
                        Category *
                        <input
                            required
                            maxLength={100}
                            value={form.category}
                            onChange={(e) => updateField("category", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2"
                        />
                    </label>

                    <label className="space-y-1 text-sm font-medium text-slate-700">
                        Price
                        <input
                            maxLength={50}
                            value={form.price}
                            onChange={(e) => updateField("price", e.target.value)}
                            placeholder="e.g. ₹1,500"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2"
                        />
                    </label>

                    <label className="space-y-1 text-sm font-medium text-slate-700">
                        Image URL (optional)
                        <input
                            type="url"
                            value={form.imageUrl}
                            onChange={(e) => updateField("imageUrl", e.target.value)}
                            placeholder="https://..."
                            className="w-full rounded-lg border border-slate-300 px-3 py-2"
                        />
                    </label>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                        Upload product image (maximum 5 MB)
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:font-medium"
                    />

                    {(previewUrl || form.imageUrl) && (
                        <div className="pt-2">
                            <img
                                src={previewUrl || form.imageUrl}
                                alt="Product preview"
                                className="h-36 w-36 rounded-xl border border-slate-200 object-cover"
                            />
                        </div>
                    )}

                    {selectedImage && (
                        <p className="text-xs text-slate-500">
                            Selected: {selectedImage.name}
                        </p>
                    )}
                </div>

                <label className="block space-y-1 text-sm font-medium text-slate-700">
                    Description
                    <textarea
                        rows={3}
                        maxLength={5000}
                        value={form.description}
                        onChange={(e) => updateField("description", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                        type="checkbox"
                        checked={form.isActive}
                        onChange={(e) => updateField("isActive", e.target.checked)}
                    />
                    Active on website
                </label>

                <div className="flex flex-wrap gap-3">
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                    >
                        {saving
                            ? selectedImage
                                ? "Uploading image..."
                                : "Saving..."
                            : editingId !== null
                                ? "Save changes"
                                : "Add product"}
                    </button>

                    {editingId !== null && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-200 p-5">
                    <h3 className="font-semibold text-slate-900">
                        All products ({products.length})
                    </h3>

                    <button
                        type="button"
                        onClick={() => void loadProducts()}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900"
                    >
                        Refresh
                    </button>
                </div>

                {loading ? (
                    <p className="p-6 text-sm text-slate-500">Loading products...</p>
                ) : products.length === 0 ? (
                    <p className="p-6 text-sm text-slate-500">No products added yet.</p>
                ) : (
                    <div className="divide-y divide-slate-200">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex min-w-0 gap-4">
                                    {product.imageUrl && (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="h-16 w-16 shrink-0 rounded-lg border border-slate-200 object-cover"
                                        />
                                    )}

                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h4 className="font-semibold text-slate-900">
                                                {product.name}
                                            </h4>

                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-medium ${product.isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-slate-100 text-slate-600"
                                                    }`}
                                            >
                                                {product.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </div>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {product.category}
                                            {product.price ? ` · ${product.price}` : ""}
                                        </p>

                                        {product.description && (
                                            <p className="mt-2 max-w-2xl text-sm text-slate-600">
                                                {product.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex shrink-0 flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => startEditing(product)}
                                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => void toggleStatus(product)}
                                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
                                    >
                                        {product.isActive ? "Deactivate" : "Activate"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => void deleteProduct(product)}
                                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
