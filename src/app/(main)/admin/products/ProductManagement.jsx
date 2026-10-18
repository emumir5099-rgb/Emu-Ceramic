
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Package,
  Plus,
  Pencil,
  Trash2,
  X,
  RefreshCw,
  Star,
} from "lucide-react";

const EMPTY_FORM = {
  name: "",
  collection: "Marble",
  size: "",
  finish: "",
  price: "",
  image: "",
  featured: false,
};

const inputClass =
  "mt-2 w-full border border-[#0B211D]/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A47743]";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadProducts = useCallback(async () => {
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

      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Products load করা যায়নি।");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  function updateField(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function openAddForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
    setMessage("");
    setShowForm(true);
  }

  function openEditForm(product) {
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

    setError("");
    setMessage("");
    setShowForm(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const endpoint = editingId
        ? `/api/products/${editingId}`
        : "/api/products";

      const response = await fetch(endpoint, {
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
        throw new Error(data.message || "Product save করা যায়নি।");
      }

      closeForm();
      await loadProducts();

      setMessage(
        editingId
          ? "Product সফলভাবে update হয়েছে।"
          : "নতুন product সফলভাবে যোগ হয়েছে।"
      );
    } catch (err) {
      setError(err.message || "কোনো সমস্যা হয়েছে।");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(
      `"${product.name}" মুছে ফেলতে চাও?\nএই কাজটি ফিরিয়ে আনা যাবে না।`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Product delete করা যায়নি।");
      }

      setProducts((current) =>
        current.filter((item) => item.id !== product.id)
      );

      setMessage("Product সফলভাবে delete হয়েছে।");
    } catch (err) {
      setError(err.message || "Product delete করা যায়নি।");
    }
  }

  const filteredProducts = products.filter((product) => {
    const text = [
      product.name,
      product.collection,
      product.size,
      product.finish,
    ]
      .join(" ")
      .toLowerCase();

    return text.includes(search.trim().toLowerCase());
  });

  return (
    <main className="min-h-screen bg-[#F5F3ED] text-[#0B211D]">
      <header className="bg-[#0B211D] px-5 py-8 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/admin"
            className="mb-7 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-[#D7B47A]"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#D7B47A]">
                EMU CERAMIC · Store Control
              </p>

              <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">
                Product Management
              </h1>

              <p className="mt-3 text-sm text-white/65">
                তোমার ceramic tile collection পরিচালনা করো।
              </p>
            </div>

            <Link
              href="/all-tiles"
              className="inline-flex w-fit items-center gap-2 border border-white/25 px-4 py-3 text-sm transition hover:border-[#D7B47A] hover:text-[#D7B47A]"
            >
              View Store
              <ExternalLink size={15} />
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="mb-7 grid gap-4 sm:grid-cols-3">
          <div className="border border-[#0B211D]/10 bg-white p-5">
            <Package className="text-[#A47743]" size={23} />
            <p className="mt-4 text-sm text-[#0B211D]/60">Total Products</p>
            <p className="mt-1 text-3xl font-semibold">
              {loading ? "..." : products.length}
            </p>
          </div>

          <div className="border border-[#0B211D]/10 bg-white p-5">
            <Star className="text-[#A47743]" size={23} />
            <p className="mt-4 text-sm text-[#0B211D]/60">Featured Products</p>
            <p className="mt-1 text-3xl font-semibold">
              {loading
                ? "..."
                : products.filter((item) => item.featured).length}
            </p>
          </div>

          <div className="border border-[#0B211D]/10 bg-white p-5">
            <Package className="text-[#A47743]" size={23} />
            <p className="mt-4 text-sm text-[#0B211D]/60">Collections</p>
            <p className="mt-1 text-3xl font-semibold">
              {loading
                ? "..."
                : new Set(products.map((item) => item.collection)).size}
            </p>
          </div>
        </div>

        {message && (
          <div
            role="status"
            className="mb-5 border border-green-700/20 bg-green-50 p-4 text-sm text-green-800"
          >
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-5 border border-red-700/20 bg-red-50 p-4 text-sm text-red-800"
          >
            {error}
          </div>
        )}

        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold">All Products</h2>
            <p className="mt-1 text-sm text-[#0B211D]/60">
              পণ্য যোগ, সম্পাদনা অথবা মুছে ফেলো।
            </p>
          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center justify-center gap-2 bg-[#0B211D] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#A47743]"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {showForm && (
          <section className="mb-8 border border-[#0B211D]/10 bg-white p-5 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>

              <button
                type="button"
                onClick={closeForm}
                aria-label="Close form"
                className="p-2 transition hover:text-[#A47743]"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium">
                  Product Name *
                  <input
                    className={inputClass}
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    placeholder="e.g. Royal Marble White"
                    required
                    maxLength={120}
                  />
                </label>

                <label className="block text-sm font-medium">
                  Collection *
                  <input
                    className={inputClass}
                    name="collection"
                    value={form.collection}
                    onChange={updateField}
                    placeholder="e.g. Marble"
                    required
                    maxLength={80}
                  />
                </label>

                <label className="block text-sm font-medium">
                  Tile Size *
                  <input
                    className={inputClass}
                    name="size"
                    value={form.size}
                    onChange={updateField}
                    placeholder="e.g. 24 x 24 inch"
                    required
                    maxLength={80}
                  />
                </label>

                <label className="block text-sm font-medium">
                  Finish *
                  <input
                    className={inputClass}
                    name="finish"
                    value={form.finish}
                    onChange={updateField}
                    placeholder="e.g. Glossy"
                    required
                    maxLength={80}
                  />
                </label>

                <label className="block text-sm font-medium">
                  Price (৳) *
                  <input
                    className={inputClass}
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={updateField}
                    placeholder="e.g. 120"
                    min="0"
                    step="0.01"
                    required
                  />
                </label>

                <label className="block text-sm font-medium">
                  Product Image URL *
                  <input
                    className={inputClass}
                    type="url"
                    name="image"
                    value={form.image}
                    onChange={updateField}
                    placeholder="https://example.com/tile.jpg"
                    required
                  />
                </label>
              </div>

              {form.image && /^https?:\/\//i.test(form.image) && (
                <div>
                  <p className="mb-2 text-sm text-[#0B211D]/60">
                    Image preview
                  </p>
                  <img
                    src={form.image}
                    alt="Product preview"
                    className="h-40 w-40 border border-[#0B211D]/10 object-cover"
                  />
                </div>
              )}

              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={updateField}
                  className="h-4 w-4 accent-[#0B211D]"
                />
                Mark as Featured Product
              </label>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#0B211D] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#A47743] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Save Changes"
                      : "Create Product"}
                </button>

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="border border-[#0B211D]/20 px-6 py-3 text-sm transition hover:border-[#A47743]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by product name, collection, size..."
            className="min-w-0 flex-1 border border-[#0B211D]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#A47743]"
          />

          <button
            type="button"
            onClick={loadProducts}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 border border-[#0B211D]/20 px-4 py-3 text-sm transition hover:border-[#A47743] disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="border border-[#0B211D]/10 bg-white p-10 text-center text-sm">
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="border border-[#0B211D]/10 bg-white p-10 text-center">
            <Package className="mx-auto text-[#A47743]" size={30} />
            <p className="mt-4 font-medium">কোনো product পাওয়া যায়নি।</p>
            <p className="mt-2 text-sm text-[#0B211D]/60">
              Search পরিবর্তন করো অথবা নতুন product যোগ করো।
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden border border-[#0B211D]/10 bg-white"
              >
                <div className="relative aspect-[4/3] bg-[#EAE6DC]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />

                  {product.featured && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 bg-[#0B211D] px-3 py-2 text-xs text-[#D7B47A]">
                      <Star size={13} />
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#A47743]">
                    {product.collection}
                  </p>

                  <h3 className="mt-2 text-lg font-semibold">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm text-[#0B211D]/60">
                    {product.size} · {product.finish}
                  </p>

                  <p className="mt-4 text-xl font-semibold">
                    ৳{Number(product.price || 0).toLocaleString("en-BD")}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => openEditForm(product)}
                      className="inline-flex items-center justify-center gap-2 border border-[#0B211D]/20 px-3 py-3 text-sm transition hover:border-[#A47743] hover:text-[#A47743]"
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      className="inline-flex items-center justify-center gap-2 border border-red-700/20 px-3 py-3 text-sm text-red-700 transition hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="mt-8 text-center text-xs text-[#0B211D]/45">
          EMU CERAMIC · PRODUCT MANAGEMENT
        </p>
      </section>
    </main>
  );
}
