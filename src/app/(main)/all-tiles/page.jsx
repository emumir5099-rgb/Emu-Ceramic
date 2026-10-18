
"use client";

import { useEffect, useMemo, useState } from "react";
import { collections } from "@/lib/initial-products";
import {
  Search,
  ShoppingBag,
  Plus,
  Minus,
  X,
  MessageCircle,
  Trash2,
  SlidersHorizontal,
  ArrowRight,
} from "lucide-react";

const CURRENT_YEAR = 2026;

const WHATSAPP_NUMBER = "8801772404329";

const money = (amount) =>
  `৳${Number(amount || 0).toLocaleString("en-BD")}`;

export default function PremiumCollectionPage() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  // MongoDB থেকে products load
  
  // MongoDB থেকে products load
  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setProductsLoading(true);
        setProductsError("");

        const response = await fetch("/api/products", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("API থেকে product array পাওয়া যায়নি।");
        }

        setProducts(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Product loading error:", error);
          setProductsError(error.message || "Products load করা যায়নি।");
        }
      } finally {
        if (!controller.signal.aborted) {
          setProductsLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, []);

  // Search, category and price sorting
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const query = search.trim().toLowerCase();

      const matchesCategory =
        category === "All" || product.collection === category;

      const matchesSearch =
        !query ||
        product.name?.toLowerCase().includes(query) ||
        product.collection?.toLowerCase().includes(query) ||
        product.size?.toLowerCase().includes(query) ||
        product.finish?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sortBy === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sortBy === "featured") {
      result = [...result].sort(
        (a, b) => Number(b.featured) - Number(a.featured)
      );
    }

    return result;
  }, [products, search, category, sortBy]);

  // Cart-এর products
  const cartItems = products
    .filter((product) => (cart[product.id] || 0) > 0)
    .map((product) => ({
      ...product,
      quantity: cart[product.id],
    }));

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function updateQuantity(productId, change) {
    setCart((previousCart) => {
      const nextCart = { ...previousCart };
      const newQuantity = (nextCart[productId] || 0) + change;

      if (newQuantity <= 0) {
        delete nextCart[productId];
      } else {
        nextCart[productId] = newQuantity;
      }

      return nextCart;
    });
  }

  function handleBuyNow(product) {
    setCart((previousCart) => ({
      ...previousCart,
      [product.id]: (previousCart[product.id] || 0) + 1,
    }));

    setCartOpen(true);
  }

  function removeFromCart(productId) {
    setCart((previousCart) => {
      const nextCart = { ...previousCart };
      delete nextCart[productId];
      return nextCart;
    });
  }

  function updateCustomer(field, value) {
    setCustomer((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function sendOrder() {
    if (cartItems.length === 0) {
      alert("প্রথমে কার্টে পণ্য যোগ করুন।");
      return;
    }

    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim()
    ) {
      alert("আপনার নাম, ফোন নম্বর ও ঠিকানা পূরণ করুন।");
      return;
    }

    if (!/^\+?[0-9\s()-]{8,20}$/.test(customer.phone.trim())) {
      alert("সঠিক ফোন নম্বর লিখুন।");
      return;
    }

    if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      alert("কোডে সঠিক WhatsApp নম্বর বসান।");
      return;
    }

    const itemLines = cartItems.map(
      (item, index) =>
        `${index + 1}. ${item.name}\n` +
        `Size: ${item.size}\n` +
        `Finish: ${item.finish}\n` +
        `Quantity: ${item.quantity} sq.ft.\n` +
        `Price: ${money(item.price)} / sq.ft.\n` +
        `Subtotal: ${money(item.price * item.quantity)}`
    );

    const message = [
      "Assalamu Alaikum, I want to order from EMU CERAMIC.",
      "",
      "CUSTOMER DETAILS",
      `Name: ${customer.name.trim()}`,
      `Phone: ${customer.phone.trim()}`,
      `Address: ${customer.address.trim()}`,
      "",
      "ORDER DETAILS",
      ...itemLines,
      "",
      `Product Total: ${money(total)}`,
      "Please confirm stock, delivery charges and final price.",
      customer.note.trim()
        ? `Additional Note: ${customer.note.trim()}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#282820]">
      {/* HERO */}
      <section className="bg-[#24271f] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-2">
          <div>
            <p className="mb-5 text-xs tracking-[0.3em] text-[#d5c29c]">
              THE ART OF SURFACES
            </p>

            <p className="text-sm tracking-[0.25em] text-[#c8b99c]">
              EMU CERAMIC
            </p>

            <h1 className="mt-4 text-4xl font-light sm:text-6xl">
              Premium
              <span className="block font-semibold text-[#d5c29c]">
                Collection
              </span>
            </h1>

            <p className="mt-5 max-w-lg leading-7 text-white/70">
              Discover elegant surfaces for beautiful homes,
              modern offices and timeless spaces.
            </p>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("collection")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-8 flex items-center gap-3 bg-[#d5c29c] px-6 py-3 font-medium text-[#24271f] hover:bg-white"
            >
              Explore Collection
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <img
                src={collections[0].image}
                alt="Marble-inspired interior"
                className="h-64 w-full object-cover sm:h-80"
              />
              <p className="mt-3 text-sm text-[#d5c29c]">
                Marble Elegance
              </p>
            </div>

            <div className="mt-8">
              <img
                src={collections[2].image}
                alt="Wood-inspired interior"
                className="h-64 w-full object-cover sm:h-80"
              />
              <p className="mt-3 text-sm text-[#d5c29c]">
                Wood Essence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section
        id="collection"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.25em] text-[#8b7855]">
              FIND YOUR STYLE
            </p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
              Premium Tiles
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Explore all {products.length} products.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 bg-[#292b23] px-5 py-3 text-white hover:bg-[#45483b]"
          >
            <ShoppingBag size={19} />
            Cart
            <span className="rounded-full bg-[#d5c29c] px-2 py-0.5 text-xs text-black">
              {cartCount}
            </span>
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3 border border-gray-200 bg-white px-4 py-3">
            <Search size={19} className="text-gray-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tiles, size or finish..."
              aria-label="Search products"
              className="w-full bg-transparent text-sm outline-none"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <label className="flex items-center gap-2 border border-gray-200 bg-white px-3 py-2 text-sm">
            <SlidersHorizontal size={17} />
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort products"
              className="max-w-48 bg-transparent outline-none"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </label>
        </div>

        {/* CATEGORY */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {["All", ...collections.map((item) => item.name)].map(
            (item) => (
              <button
                type="button"
                key={item}
                onClick={() => setCategory(item)}
                className={`shrink-0 border px-4 py-2 text-sm ${
                  category === item
                    ? "border-[#292b23] bg-[#292b23] text-white"
                    : "border-gray-200 bg-white hover:border-[#292b23]"
                }`}
              >
                {item === "All" ? "All Products" : item}
              </button>
            )
          )}
        </div>

        <p className="mb-5 text-sm text-gray-500">
          {productsLoading
            ? "Loading products..."
            : `Showing ${filteredProducts.length} products`}
        </p>

        {/* PRODUCT GRID */}
        {productsLoading ? (
          <div className="border border-gray-200 bg-white py-16 text-center">
            <p className="text-sm text-gray-500">
              Loading products from MongoDB...
            </p>
          </div>
        ) : productsError ? (
          <div className="border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm text-red-700">{productsError}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-3 underline"
            >
              Try again
            </button>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const quantity = cart[product.id] || 0;

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden border border-[#e9e5dc] bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#eee9df]">
                    <img
                      src={product.image}
                      alt={`${product.name} tile design`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {product.featured && (
                      <span className="absolute left-3 top-3 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-widest">
                        Featured
                      </span>
                    )}

                    <span className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 text-xs text-white">
                      {product.collection}
                    </span>
                  </div>

                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8b7855]">
                      EMU CERAMIC · EC-
                      {product.legacyId
                        ? String(product.legacyId).padStart(3, "0")
                        : String(product.id).slice(-6).toUpperCase()}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold">
                      {product.name}
                    </h3>

                    <div className="mt-4 space-y-2 border-t border-gray-100 pt-3 text-sm">
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Size</span>
                        <span>{product.size}</span>
                      </div>

                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Finish</span>
                        <span>{product.finish}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs text-gray-500">
                        Price / sq.ft.
                      </p>
                      <p className="text-xl font-semibold">
                        {money(product.price)}
                      </p>
                    </div>

                    {/* ADD TO CART */}
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, 1)}
                      className="mt-4 flex w-full items-center justify-center gap-2 border border-[#292b23] px-3 py-3 text-sm font-medium transition hover:bg-[#eeeae0]"
                    >
                      <Plus size={17} />
                      Add to Cart
                    </button>

                    {/* BUY NOW */}
                    <button
                      type="button"
                      onClick={() => handleBuyNow(product)}
                      className="mt-2 flex w-full items-center justify-center gap-2 bg-[#292b23] px-3 py-3 text-sm font-medium text-white transition hover:bg-[#555747]"
                    >
                      <ShoppingBag size={17} />
                      Buy Now
                    </button>

                    {quantity > 0 && (
                      <div className="mt-3 flex items-center justify-between border border-[#e9e5dc] p-2">
                        <span className="text-xs text-gray-600">
                          {quantity} sq.ft. in cart
                        </span>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, -1)}
                            aria-label={`Decrease ${product.name}`}
                            className="p-1 hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="text-sm font-semibold">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, 1)}
                            aria-label={`Increase ${product.name}`}
                            className="p-1 hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="border border-dashed border-gray-300 bg-white py-16 text-center">
            <Search className="mx-auto text-gray-400" size={32} />
            <h3 className="mt-4 font-semibold">No products found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Try another search or category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-4 underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* CART DRAWER */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/50"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setCartOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <p className="text-xs tracking-widest text-[#8b7855]">
                  EMU CERAMIC
                </p>
                <h2 id="cart-title" className="mt-1 text-2xl font-semibold">
                  Your Cart ({cartCount})
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="p-2 hover:bg-gray-100"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 space-y-4 p-5">
              {cartItems.length === 0 ? (
                <div className="py-12 text-center">
                  <ShoppingBag
                    className="mx-auto text-gray-300"
                    size={42}
                  />
                  <p className="mt-4 text-gray-600">
                    Your cart is empty.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="mt-4 underline"
                  >
                    Browse products
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 border-b border-gray-100 pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 shrink-0 object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {item.size} · {money(item.price)}/sq.ft.
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="border p-1"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="text-sm">
                          {item.quantity} sq.ft.
                        </span>

                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                          className="border p-1"
                        >
                          <Plus size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove product"
                          className="ml-auto p-1 text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <p className="shrink-0 text-sm font-semibold">
                      {money(item.price * item.quantity)}
                    </p>
                  </div>
                ))
              )}

              {cartItems.length > 0 && (
                <>
                  <div className="flex justify-between border-t pt-4 text-lg font-semibold">
                    <span>Product Total</span>
                    <span>{money(total)}</span>
                  </div>

                  <p className="text-xs leading-5 text-gray-500">
                    Delivery charges and final prices will be confirmed
                    by EMU CERAMIC.
                  </p>

                  <div className="space-y-4 pt-3">
                    <h3 className="font-semibold">Customer Details</h3>

                    <label className="block text-sm">
                      Full Name *
                      <input
                        value={customer.name}
                        onChange={(event) =>
                          updateCustomer("name", event.target.value)
                        }
                        placeholder="Your full name"
                        autoComplete="name"
                        className="mt-1 w-full border border-gray-300 px-3 py-3 outline-none focus:border-[#8b7855]"
                      />
                    </label>

                    <label className="block text-sm">
                      Phone Number *
                      <input
                        type="tel"
                        value={customer.phone}
                        onChange={(event) =>
                          updateCustomer("phone", event.target.value)
                        }
                        placeholder="01XXXXXXXXX"
                        autoComplete="tel"
                        className="mt-1 w-full border border-gray-300 px-3 py-3 outline-none focus:border-[#8b7855]"
                      />
                    </label>

                    <label className="block text-sm">
                      Delivery Address *
                      <textarea
                        value={customer.address}
                        onChange={(event) =>
                          updateCustomer("address", event.target.value)
                        }
                        placeholder="House, road, area, district"
                        autoComplete="street-address"
                        rows={3}
                        className="mt-1 w-full border border-gray-300 px-3 py-3 outline-none focus:border-[#8b7855]"
                      />
                    </label>

                    <label className="block text-sm">
                      Additional Instructions
                      <textarea
                        value={customer.note}
                        onChange={(event) =>
                          updateCustomer("note", event.target.value)
                        }
                        placeholder="Any special requirements..."
                        rows={2}
                        className="mt-1 w-full border border-gray-300 px-3 py-3 outline-none focus:border-[#8b7855]"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={sendOrder}
                      className="flex w-full items-center justify-center gap-3 bg-[#24764a] px-5 py-4 font-semibold text-white transition hover:bg-[#1c5e3b]"
                    >
                      <MessageCircle size={21} />
                      Order via WhatsApp
                    </button>

                    <p className="text-center text-xs leading-5 text-gray-500">
                      WhatsApp will open with your order details.
                      Press Send in WhatsApp to submit the order.
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#24271f] px-5 py-10 text-center text-white">
        <p className="text-xs tracking-[0.3em] text-[#d5c29c]">
          THE ART OF SURFACES
        </p>
        <h2 className="mt-3 text-2xl font-semibold">EMU CERAMIC</h2>
        <p className="mt-3 text-sm text-white/60">
          Timeless surfaces. Thoughtful spaces.
        </p>
        <p className="mt-6 text-xs text-white/40">
         © {CURRENT_YEAR} EMU CERAMIC. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
