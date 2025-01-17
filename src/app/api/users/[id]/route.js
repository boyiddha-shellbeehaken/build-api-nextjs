// Build GET, PUT, DELETE API with static DB //
import { users } from "@/util/db";
import { NextResponse } from "next/server";
import React from "react";

export async function GET(req, { params }) {
  const { id } = await params;

  // Find the user by ID
  const user = users.find((user) => user.id === id);

  if (user) {
    return NextResponse.json(user, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "User with ID not found" },
      { status: 404 }
    );
  }
}

export async function PUT(req, { params }) {
  let payload = await req.json();
  //console.log(id);
  //console.log(payload);
  if (!payload.name || !payload.age || !payload.email) {
    return NextResponse.json(
      { result: "request data is not valid", success: false },
      { status: 400 }
    );
  }

  return NextResponse.json({ result: payload, success: true }, { status: 200 });
}

export async function DELETE(req, { params }) {
  let { id } = await params;
  if (id) {
    return NextResponse.json(
      { result: "user Deleted", success: true },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { result: "Error! Plz try again", success: false },
      { status: 400 }
    );
  }
}
