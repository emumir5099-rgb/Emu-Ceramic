
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";


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

function validateProduct(body) {
  const fields = ["name", "collection", "size", "finish", "image"];

  for (const field of fields) {
    if (
      typeof body[field] !== "string" ||
      !body[field].trim()
    ) {
      return `${field} field পূরণ করো।`;
    }
  }

  if (
    !Number.isFinite(Number(body.price)) ||
    Number(body.price) < 0
  ) {
    return "সঠিক price দাও।";
  }

  if (!/^https?:\/\//i.test(body.image.trim())) {
    return "Image-এর valid HTTP/HTTPS URL দাও।";
  }

  return null;
}

export async function PATCH(request, { params }) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(
        { message: "Admin permission required." },
        { status: 403 }
      );
    }

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product ID." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validationError = validateProduct(body);

    if (validationError) {
      return NextResponse.json(
        { message: validationError },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const update = {
      name: body.name.trim(),
      collection: body.collection.trim(),
      size: body.size.trim(),
      finish: body.finish.trim(),
      image: body.image.trim(),
      price: Number(body.price),
      featured: body.featured === true,
      updatedAt: new Date(),
    };

    const result = await db.collection("products").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json(
        { message: "Product পাওয়া যায়নি।" },
        { status: 404 }
      );
    }

    return NextResponse.json(serializeProduct(result));
  } catch (error) {
    console.error("PATCH /api/products/[id] failed:", error);

    return NextResponse.json(
      { message: "Product update করা যায়নি।" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(
        { message: "Admin permission required." },
        { status: 403 }
      );
    }

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product ID." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Product পাওয়া যায়নি।" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/products/[id] failed:", error);

    return NextResponse.json(
      { message: "Product delete করা যায়নি।" },
      { status: 500 }
    );
  }
}
