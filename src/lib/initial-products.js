
export const collections = [
  {
    name: "Marble",
    title: "Marble Elegance",
    price: 95,
    finish: "Glossy",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Stone",
    title: "Natural Stone",
    price: 85,
    finish: "Matte",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Wood",
    title: "Wood Essence",
    price: 105,
    finish: "Matte",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Concrete",
    title: "Urban Concrete",
    price: 80,
    finish: "Matte",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Glossy",
    title: "Glossy Luxe",
    price: 90,
    finish: "High Gloss",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Matte",
    title: "Minimal Matte",
    price: 88,
    finish: "Matte",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Mosaic",
    title: "Mosaic Art",
    price: 120,
    finish: "Decorative",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Outdoor",
    title: "Outdoor Pro",
    price: 75,
    finish: "Textured",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
  },
];

export const sizes = [
  "12×12 inch",
  "12×24 inch",
  "24×24 inch",
  "24×48 inch",
  "32×32 inch",
  "36×36 inch",
];

export const initialProducts = collections.flatMap(
  (collection, collectionIndex) =>
    sizes.map((size, sizeIndex) => ({
      legacyId: collectionIndex * sizes.length + sizeIndex + 1,
      name: `${collection.title} ${String(sizeIndex + 1).padStart(2, "0")}`,
      collection: collection.name,
      size,
      finish: collection.finish,
      price: collection.price + sizeIndex * 5,
      image: collection.image,
      featured: sizeIndex === 0 || sizeIndex === 2,
    }))
);
