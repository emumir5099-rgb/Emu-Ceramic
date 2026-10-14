
"use client";

import { useMemo, useState } from "react";

const WHATSAPP_NUMBER = "8809696026555";

const categories = [
  "All Collections",
  "Floor Tiles",
  "Wall Tiles",
  "Marble Look",
  "Stone Look",
];

const products = [
  {
    id: 1,
    name: "Royal Marble",
    category: "Marble Look",
    price: 125,
    size: "600 × 1200 mm",
    sku: "EMU-RM-001",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
    description: "Elegant marble-inspired finish for premium interiors.",
  },
  {
    id: 2,
    name: "Ivory Elegance",
    category: "Floor Tiles",
    price: 95,
    size: "600 × 600 mm",
    sku: "EMU-IE-002",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
    description: "Warm ivory tones for bright, welcoming spaces.",
  },
  {
    id: 3,
    name: "Urban Stone",
    category: "Stone Look",
    price: 110,
    size: "600 × 1200 mm",
    sku: "EMU-US-003",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
    description: "Natural stone aesthetics for modern architecture.",
  },
  {
    id: 4,
    name: "Serene Walls",
    category: "Wall Tiles",
    price: 85,
    size: "300 × 600 mm",
    sku: "EMU-SW-004",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
    description: "A refined finish for stylish walls and bathrooms.",
  },
  {
    id: 5,
    name: "Grand Palazzo",
    category: "Marble Look",
    price: 145,
    size: "800 × 800 mm",
    sku: "EMU-GP-005",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=85",
    description: "A sophisticated look for statement interiors.",
  },
  {
    id: 6,
    name: "Natural Harmony",
    category: "Floor Tiles",
    price: 105,
    size: "600 × 600 mm",
    sku: "EMU-NH-006",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
    description: "Subtle textures for calm and comfortable living.",
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-BD", {
    maximumFractionDigits: 2,
  }).format(amount);

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState("All Collections");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All Collections" ||
        product.category === activeCategory;

      const matchesSearch = [
        product.name,
        product.category,
        product.sku,
        product.size,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...current, { ...product, qty: 1 }];
    });

    setCartOpen(true);
  }

  function changeQuantity(id, change) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty + change }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function updateCustomer(field, value) {
    setCustomer((current) => ({ ...current, [field]: value }));
  }

  function placeWhatsAppOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
      alert("Please add a product to your cart first.");
      return;
    }

    const itemLines = cart
      .map(
        (item) =>
          `• ${item.name} (${item.sku})\n  ${item.qty} sq. ft. × ৳${money(
            item.price
          )} = ৳${money(item.price * item.qty)}`
      )
      .join("\n\n");

    const message = [
      "Hello EMU CERAMIC!",
      "",
      "I would like to place a tile order.",
      "",
      "ORDER DETAILS",
      itemLines,
      "",
      `Estimated subtotal: ৳${money(cartTotal)}`,
      "",
      "CUSTOMER DETAILS",
      `Name: ${customer.name}`,
      `Phone: ${customer.phone}`,
      `Delivery address: ${customer.address}`,
      `Additional note: ${customer.note || "None"}`,
      "",
      "Please confirm product availability, box coverage, final quantity and delivery charges.",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#17352d]">
      {/* Hero */}
      <section className="relative flex min-h-[410px] items-center overflow-hidden bg-[#0b211d] px-5 py-16 text-white md:min-h-[490px] md:px-12">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071713] via-[#0b211d]/85 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#d7b47a]">
            EMU CERAMIC · CURATED SURFACES
          </p>

          <h1 className="max-w-3xl text-4xl font-light leading-tight md:text-6xl">
            Discover Your
            <br />
            <span className="font-semibold text-[#d7b47a]">
              Perfect Surface.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-white/75 md:text-base">
            Explore ceramic collections, compare prices and order your
            favourite tiles directly through WhatsApp.
          </p>

          <a
            href="#collections"
            className="mt-8 inline-flex bg-[#d7b47a] px-7 py-4 text-xs font-bold uppercase tracking-widest text-[#0b211d] transition hover:bg-white"
          >
            Shop Collections ↗
          </a>
        </div>
      </section>

      {/* Product listing */}
      <section
        id="collections"
        className="mx-auto max-w-7xl px-5 py-14 md:px-12 md:py-20"
      >
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#a17b43]">
              FIND YOUR STYLE
            </p>
            <h2 className="text-3xl font-medium md:text-4xl">
              Shop Our Collections
            </h2>
            <p className="mt-3 text-sm text-[#68746e]">
              {filteredProducts.length} products available in this view
            </p>
          </div>

          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="flex items-center justify-center gap-3 self-start bg-[#0b211d] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#21473c] md:self-auto"
          >
            <span aria-hidden="true">🛒</span>
            My Cart ({cartCount})
            <span className="text-[#d7b47a]">৳{money(cartTotal)}</span>
          </button>
        </div>

        {/* Search */}
        <div className="mt-8">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by product, model or size..."
            aria-label="Search products"
            className="w-full border border-[#dedbd2] bg-white px-5 py-4 text-sm outline-none transition focus:border-[#a17b43]"
          />
        </div>

        {/* Category filters */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 border px-4 py-3 text-xs font-semibold transition ${
                activeCategory === category
                  ? "border-[#0b211d] bg-[#0b211d] text-white"
                  : "border-[#dedbd2] text-[#526159] hover:border-[#a17b43]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cart panel */}
        {cartOpen && (
          <section className="mt-8 border border-[#dedbd2] bg-white p-5 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a17b43]">
                  YOUR SELECTION
                </p>
                <h3 className="mt-2 text-2xl font-medium">Shopping Cart</h3>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                className="border border-[#dedbd2] px-4 py-2 text-sm"
              >
                Close ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="py-8 text-sm text-[#68746e]">
                Your cart is empty. Add a tile collection to get started.
              </p>
            ) : (
              <>
                <div className="mt-6 divide-y divide-[#e9e5dd]">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-full object-cover sm:w-28"
                      />

                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="mt-1 text-xs text-[#68746e]">
                          {item.sku} · ৳{money(item.price)}/sq. ft.
                        </p>
                        <p className="mt-2 font-semibold">
                          ৳{money(item.price * item.qty)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => changeQuantity(item.id, -1)}
                          aria-label={`Decrease ${item.name} quantity`}
                          className="h-9 w-9 border border-[#dedbd2]"
                        >
                          −
                        </button>

                        <span className="min-w-12 text-center text-sm">
                          {item.qty} sq. ft.
                        </span>

                        <button
                          onClick={() => changeQuantity(item.id, 1)}
                          aria-label={`Increase ${item.name} quantity`}
                          className="h-9 w-9 border border-[#dedbd2]"
                        >
                          +
                        </button>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 text-xs text-red-700 underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col justify-between gap-5 border-t border-[#dedbd2] pt-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm text-[#68746e]">
                      Estimated subtotal
                    </p>
                    <p className="mt-1 text-2xl font-semibold">
                      ৳{money(cartTotal)}
                    </p>
                    <p className="mt-2 max-w-md text-xs leading-5 text-[#68746e]">
                      Delivery, box coverage and final order quantity will
                      be confirmed by EMU CERAMIC.
                    </p>
                  </div>

                  <button
                    onClick={() => setCheckoutOpen(true)}
                    className="bg-[#0b211d] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#21473c]"
                  >
                    Continue to Order ↗
                  </button>
                </div>
              </>
            )}
          </section>
        )}

        {/* Checkout form */}
        {checkoutOpen && (
          <section className="mt-8 border border-[#d7b47a] bg-white p-5 md:p-8">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a17b43]">
                  ALMOST THERE
                </p>
                <h3 className="mt-2 text-2xl font-medium">
                  Your Order Details
                </h3>
                <p className="mt-2 text-sm text-[#68746e]">
                  Fill in your details. Your order will open in WhatsApp for
                  you to send to our team.
                </p>
              </div>

              <button
                onClick={() => setCheckoutOpen(false)}
                aria-label="Close order form"
                className="border border-[#dedbd2] px-3 py-2"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={placeWhatsAppOrder}
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              <label className="text-sm font-medium">
                Full name *
                <input
                  required
                  value={customer.name}
                  onChange={(event) =>
                    updateCustomer("name", event.target.value)
                  }
                  placeholder="Enter your name"
                  className="mt-2 w-full border border-[#dedbd2] px-4 py-3 font-normal outline-none focus:border-[#a17b43]"
                />
              </label>

              <label className="text-sm font-medium">
                Mobile number *
                <input
                  required
                  type="tel"
                  value={customer.phone}
                  onChange={(event) =>
                    updateCustomer("phone", event.target.value)
                  }
                  placeholder="01XXXXXXXXX"
                  className="mt-2 w-full border border-[#dedbd2] px-4 py-3 font-normal outline-none focus:border-[#a17b43]"
                />
              </label>

              <label className="text-sm font-medium md:col-span-2">
                Delivery address *
                <textarea
                  required
                  value={customer.address}
                  onChange={(event) =>
                    updateCustomer("address", event.target.value)
                  }
                  placeholder="House, road, area, district"
                  rows={3}
                  className="mt-2 w-full border border-[#dedbd2] px-4 py-3 font-normal outline-none focus:border-[#a17b43]"
                />
              </label>

              <label className="text-sm font-medium md:col-span-2">
                Additional note (optional)
                <textarea
                  value={customer.note}
                  onChange={(event) =>
                    updateCustomer("note", event.target.value)
                  }
                  placeholder="Preferred delivery time or any other requirements"
                  rows={2}
                  className="mt-2 w-full border border-[#dedbd2] px-4 py-3 font-normal outline-none focus:border-[#a17b43]"
                />
              </label>

              <div className="border-t border-[#dedbd2] pt-5 md:col-span-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[#68746e]">
                    Estimated subtotal
                  </span>
                  <span className="text-xl font-semibold">
                    ৳{money(cartTotal)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="mt-5 w-full bg-[#187b48] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#12643a]"
                >
                  Send Order via WhatsApp ↗
                </button>

                <p className="mt-3 text-center text-xs leading-5 text-[#68746e]">
                  WhatsApp will open with your order details. You must press
                  Send in WhatsApp to submit the order.
                </p>
              </div>
            </form>
          </section>
        )}

        {/* Product cards */}
        <div className="mt-9 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden border border-[#e8e4dc] bg-white transition hover:border-[#d7b47a]"
            >
              <div className="relative aspect-[4/3.7] overflow-hidden bg-[#e9e6df]">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 bg-[#faf9f6] px-3 py-2 text-[10px] font-bold uppercase tracking-widest">
                  {product.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-medium">{product.name}</h3>
                    <p className="mt-2 text-xs text-[#68746e]">
                      Model: {product.sku}
                    </p>
                    <p className="mt-1 text-xs text-[#68746e]">
                      Size: {product.size}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-lg font-semibold text-[#17352d]">
                      ৳{money(product.price)}
                    </p>
                    <p className="text-[10px] text-[#68746e]">per sq. ft.</p>
                  </div>
                </div>

                <p className="mt-4 min-h-12 text-sm leading-6 text-[#68746e]">
                  {product.description}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-5 w-full border border-[#0b211d] bg-[#0b211d] px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:border-[#d7b47a] hover:bg-[#d7b47a] hover:text-[#0b211d]"
                >
                  Add to Cart +
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-medium">No products found</h3>
            <p className="mt-3 text-sm text-[#68746e]">
              Try a different search or category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All Collections");
              }}
              className="mt-6 bg-[#0b211d] px-6 py-3 text-xs font-bold text-white"
            >
              Show All Products
            </button>
          </div>
        )}
      </section>

      {/* Contact CTA */}
      <section className="bg-[#eae5d9] px-5 py-16 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#a17b43]">
              NEED HELP CHOOSING?
            </p>
            <h2 className="text-3xl font-medium">
              Let&apos;s find your perfect tiles.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#68746e]">
              Contact our team to confirm availability, box coverage,
              delivery charges and the quantity you need.
            </p>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hello EMU CERAMIC! I would like help choosing ceramic tiles."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#187b48] px-7 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#12643a]"
          >
            Chat on WhatsApp ↗
          </a>
        </div>
      </section>
    </main>
  );
}
