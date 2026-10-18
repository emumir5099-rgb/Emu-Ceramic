
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  LoaderCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const emptyForm = {
  name: "",
  collection: "Marble",
  size: "24×24 inch",
  finish: "Glossy",
  price: "",
  image: "",
  featured: false,
};

const money = (amount) =>
  `৳${Number(amount || 0).toLocaleString("en-BD")}`;

export default function AdminProductsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isAdmin = session?.user?.role === "admin";

  async function loadProducts() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/products", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Products load করা যায়নি।");
      }

      setProducts(data);
    } catch (err) {
      setError(err.message || "Products load করা যায়নি।");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login");
      return;
    }

    if (!isPending && session?.user && !isAdmin) {
      router.replace("/client");
    }
  }, [isPending, session, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) {
      loadProducts();
    }
  }, [isAdmin]);

  function updateField(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function startEditing(product) {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      collection: product.collection || "Marble",
      size: product.size || "",
      finish: product.finish || "",
      price: String(product.price ?? ""),
      image: product.image || "",
      featured: product.featured === true,
    });
    setSuccess("");
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const url = editingId
        ? `/api/products/${editingId}`
        : "/api/products";

      const response = await fetch(url, {
        method: editingId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Save করা যায়নি।");
      }

      setSuccess(
        editingId
          ? "Product সফলভাবে update হয়েছে।"
          : "নতুন product সফলভাবে যোগ হয়েছে।"
      );

      resetForm();
      await loadProducts();
    } catch (err) {
      setError(err.message || "Product save করা যায়নি।");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(
      `"${product.name}" delete করতে চাও? এই কাজটি ফিরিয়ে নেওয়া যাবে না।`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete করা যায়নি।");
      }

      setProducts((previous) =>
        previous.filter((item) => item.id !== product.id)
      );

      if (editingId === product.id) {
        resetForm();
      }

      setSuccess("Product delete হয়েছে।");
    } catch (err) {
      setError(err.message || "Product delete করা যায়নি।");
    }
  }

  if (isPending || !session?.user || !isAdmin) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-[#F5F3ED]">
        <p className="text-sm text-[#0B211D]/65">
          Admin access যাচাই করা হচ্ছে...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F3ED] px-4 py-8 text-[#0B211D] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#A47743] hover:underline"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#A47743]">
              EMU CERAMIC · Store Control
            </p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
              Product Management
            </h1>
            <p className="mt-3 text-sm text-[#0B211D]/60">
              Add new tiles, update prices and manage your collection.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Package size={19} className="text-[#A47743]" />
            {products.length} products
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-5 border border-green-200 bg-green-50 p-4 text-sm text-green-800"
          >
            {success}
          </div>
        )}

        {/* Add / Edit Form */}
        <section className="mb-10 border border-[#0B211D]/10 bg-white p-5 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              <p className="mt-1 text-sm text-[#0B211D]/55">
                Fields marked with * are required.
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-1 text-sm text-red-700"
              >
                <X size={16} />
                Cancel edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm">
              Product Name *
              <input
                required
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="mt-2 w-full border border-gray-300 px-3 py-3 outline-none focus:border-[#A47743]"
                placeholder="Marble Elegance 01"
              />
            </label>

            <label className="text-sm">
              Collection *
              <select
                required
                value={form.collection}
                onChange={(event) =>
                  updateField("collection", event.target.value)
                }
                className="mt-2 w-full border border-gray-300 bg-white px-3 py-3 outline-none focus:border-[#A47743]"
              >
                {[
                  "Marble",
                  "Stone",
                  "Wood",
                  "Concrete",
                  "Glossy",
                  "Matte",
                  "Mosaic",
                  "Outdoor",
                ].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm">
              Tile Size *
              <input
                required
                value={form.size}
                onChange={(event) => updateField("size", event.target.value)}
                className="mt-2 w-full border border-gray-300 px-3 py-3 outline-none focus:border-[#A47743]"
                placeholder="24×24 inch"
              />
            </label>

            <label className="text-sm">
              Finish *
              <input
                required
                value={form.finish}
                onChange={(event) => updateField("finish", event.target.value)}
                className="mt-2 w-full border border-gray-300 px-3 py-3 outline-none focus:border-[#A47743]"
                placeholder="Glossy / Matte"
              />
            </label>

            <label className="text-sm">
              Price per sq.ft. (৳) *
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                className="mt-2 w-full border border-gray-300 px-3 py-3 outline-none focus:border-[#A47743]"
                placeholder="95"
              />
            </label>

            <label className="text-sm">
              Image URL *
              <input
                required
                type="url"
                value={form.image}
                onChange={(event) => updateField("image", event.target.value)}
                className="mt-2 w-full border border-gray-300 px-3 py-3 outline-none focus:border-[#A47743]"
                placeholder="https://..."
              />
            </label>

            {form.image && (
              <div className="sm:col-span-2">
                <p className="mb-2 text-xs text-[#0B211D]/60">
                  Image preview
                </p>
                <img
                  src={form.image}
                  alt="Product preview"
                  className="h-36 w-48 border border-gray-200 object-cover"
                />
              </div>
            )}

            <label className="flex items-center gap-3 text-sm sm:col-span-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  updateField("featured", event.target.checked)
                }
                className="h-4 w-4 accent-[#0B211D]"
              />
              Show as Featured
            </label>

            <div className="flex flex-wrap gap-3 sm:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 bg-[#0B211D] px-6 py-3 text-sm font-medium text-white hover:bg-[#A47743] disabled:opacity-60"
              >
                {saving ? (
                  <LoaderCircle className="animate-spin" size={17} />
                ) : editingId ? (
                  <Save size={17} />
                ) : (
                  <Plus size={17} />
                )}
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Save Changes"
                    : "Add Product"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-gray-300 px-5 py-3 text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Product List */}
        <section className="border border-[#0B211D]/10 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5 sm:p-6">
            <div>
              <h2 className="text-xl font-semibold">All Products</h2>
              <p className="mt-1 text-sm text-[#0B211D]/55">
                Products stored in MongoDB.
              </p>
            </div>

            <button
              type="button"
              onClick={loadProducts}
              disabled={loading}
              className="border border-[#0B211D]/20 px-4 py-2 text-sm hover:border-[#A47743]"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {loading ? (
            <div className="p-10 text-center text-sm text-gray-500">
              <LoaderCircle className="mx-auto mb-3 animate-spin" size={24} />
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="p-10 text-center text-sm text-gray-500">
              No products found.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-full border border-gray-100 object-cover sm:w-32"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{product.name}</h3>
                      {product.featured && (
                        <span className="bg-[#F3E8D4] px-2 py-1 text-[10px] uppercase tracking-wide text-[#805D2F]">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      {product.collection} · {product.size} · {product.finish}
                    </p>

                    <p className="mt-2 font-semibold">
                      {money(product.price)} / sq.ft.
                    </p>
                  </div>

                  <div className="flex gap-2 sm:shrink-0">
                    <button
                      type="button"
                      onClick={() => startEditing(product)}
                      className="inline-flex items-center gap-2 border border-[#0B211D]/20 px-4 py-2 text-sm hover:border-[#A47743]"
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      className="inline-flex items-center gap-2 border border-red-200 px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
