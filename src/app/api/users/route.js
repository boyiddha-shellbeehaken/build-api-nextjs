// Build GET, POST API with static DB //
import { users } from "@/util/db";
import { NextResponse } from "next/server";

export function GET() {
  const data = users;
  return NextResponse.json(data, { status: 200 }); // Send a JSON response with a 200 status code
}

export async function POST(req) {
  let payload = await req.json(); // json returns a promise so it needs await
  //console.log(payload);
  // check validation
  if (!payload.name || !payload.age || !payload.email) {
    return NextResponse.json(
      // Send a JSON response with a 400 status code
      { result: "require field not found", success: false },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { result: "new user created", success: true },
    { status: 200 }
  );
}
