import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { initialProducts } from "@/lib/initial-products";


async function getDatabase() {
  const client = await clientPromise;
  return client.db();
}

async function isAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user?.role === "admin";
}

function serializeProduct(product) {
  return {
    ...product,
    id: product._id.toString(),
    _id: undefined,
  };
}

async function seedInitialProducts(db) {
  const settings = db.collection("app_settings");
  const products = db.collection("products");

  const marker = await settings.findOne({
    _id: "emu-ceramic-initial-products-v1",
  });

  if (!marker) {
    const count = await products.countDocuments();

    if (count === 0) {
      await products.insertMany(initialProducts);
    }

    await settings.updateOne(
      { _id: "emu-ceramic-initial-products-v1" },
      {
        $setOnInsert: {
          seededAt: new Date(),
        },
      },
      { upsert: true }
    );
  }
}

export async function GET() {
  try {
    const db = await getDatabase();

    await seedInitialProducts(db);

    const products = await db
      .collection("products")
      .find({})
      .sort({ legacyId: 1, name: 1 })
      .toArray();

    return NextResponse.json(products.map(serializeProduct));
  } catch (error) {
    console.error("GET /api/products failed:", error);

    return NextResponse.json(
      { message: "Products load করা যায়নি।" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(
        { message: "Admin permission required." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const collection =
      typeof body.collection === "string" ? body.collection.trim() : "";
    const size = typeof body.size === "string" ? body.size.trim() : "";
    const finish = typeof body.finish === "string" ? body.finish.trim() : "";
    const image = typeof body.image === "string" ? body.image.trim() : "";
    const price = Number(body.price);

    if (!name || !collection || !size || !finish || !image) {
      return NextResponse.json(
        { message: "সব প্রয়োজনীয় product field পূরণ করো।" },
        { status: 400 }
      );
    }

    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.json(
        { message: "সঠিক product price দাও।" },
        { status: 400 }
      );
    }

    if (!/^https?:\/\//i.test(image)) {
      return NextResponse.json(
        { message: "Product image-এর valid HTTP/HTTPS URL দাও।" },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    const product = {
      name,
      collection,
      size,
      finish,
      image,
      price,
      featured: body.featured === true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("products").insertOne(product);

    return NextResponse.json(
      serializeProduct({
        _id: result.insertedId,
        ...product,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/products failed:", error);

    return NextResponse.json(
      { message: "Product তৈরি করা যায়নি।" },
      { status: 500 }
    );
  }
}
