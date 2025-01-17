// GET, POST API build with MongoDB //
import { connectionStr } from "@/lib/db";
import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  let data = [];
  let success = true;
  try {
    await mongoose.connect(connectionStr);
    data = await Product.find();
  } catch (error) {
    data = { result: "error" };
    success = false;
  }
  //console.log(data);
  return NextResponse.json({ result: data, success });
}

export async function POST(req) {
  const payload = await req.json();
  await mongoose.connect(connectionStr);
  let product = new Product(payload); // dynamically product add means get data from FORM and then call POST
  // let product = new Product({  // statically product add
  //   name: "Note 10",
  //   price: "300000",
  //   color: "red",
  //   company: "samsung",
  //   category: "mobile",
  // });
  const result = await product.save(); // save into connected DB
  return NextResponse.json({ result, success: true }); // return a response where this POST() called
}
