// Build PUT API with MongoDB ....
// Build GET API with MongoDB to get a single DATA based on _ID (Dynamic Routing)
// Build DELETE API

import { connectionStr } from "@/lib/db";
import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// as it update only one product data by it's ID that's why it is dynamic routing
export async function PUT(req, { params }) {
  //console.log(content);
  const { productId } = await params;
  const payload = await req.json();

  if (!ObjectId.isValid(productId)) {
    // Ensure productId is a valid ObjectId
    return NextResponse.json(
      { error: "Invalid ID format", success: false },
      { status: 404 }
    );
  }

  await mongoose.connect(connectionStr);
  const result = await Product.findOneAndUpdate({ _id: productId }, payload);
  if (!result) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ result, success: true });
}

export async function GET(req, { params }) {
  let success = true;
  const { productId } = await params;
  //console.log(productId);

  // MongoDB's ObjectId requires a valid 24-character hexadecimal string other wise it shows:
  // BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer
  if (!ObjectId.isValid(productId)) {
    return NextResponse.json(
      { error: "Invalid ID format", success: false },
      { status: 404 }
    );
  }
  await mongoose.connect(connectionStr);
  // Safely parse a hex string
  const id = ObjectId.createFromHexString(productId); // To avoid ObjectId deprecation use createFromHexString()
  const data = await Product.findOne(id);

  // OR,   const data = await Product.findById(productId);

  if (data) {
    return NextResponse.json({ result: data, success: true }, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Data with ID not found", success: false },
      { status: 404 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { productId } = await params;
  const id = { _id: productId }; // ProductId is string so convert into object because in MongoDB _id is a object ( Hex format)
  await mongoose.connect(connectionStr);
  const result = await Product.deleteOne(id);
  return NextResponse.json({ result, success: true });
}
