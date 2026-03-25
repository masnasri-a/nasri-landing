import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

const HASHED_PASSWORD = bcrypt.hashSync(
  process.env.CMS_PASSWORD || "nasriganteng123",
  10
);

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const expectedUsername = process.env.CMS_USERNAME || "nasriganteng";

    if (username !== expectedUsername) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = bcrypt.compareSync(
      password,
      HASHED_PASSWORD
    );

    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signToken({ username, role: "admin" });

    const response = NextResponse.json({ success: true });
    response.cookies.set("cms_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("cms_token");
  return response;
}
