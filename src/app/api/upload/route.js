// Image Upload POST API Build

import { NextResponse } from "next/server";

import { writeFile } from "fs/promises";
export async function POST(req) {
  const data = await req.formData();
  const file = data.get("uploadFile");
  if (!file) {
    return NextResponse.json({ message: "no image found", success: false });
  }
  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);
  const path = `./public/${file.name}`;
  await writeFile(path, buffer);
  return NextResponse.json({ message: "File Uploaded Success", success: true });
}
