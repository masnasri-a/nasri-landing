import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getExperience, saveExperience } from "@/lib/data";
import type { Experience } from "@/lib/data";

export async function GET() {
  const auth = await isAuthenticated();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getExperience());
}

export async function POST(req: NextRequest) {
  const auth = await isAuthenticated();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const items = getExperience();
  const newItem: Experience = { ...body, id: Date.now().toString() };
  items.unshift(newItem);
  saveExperience(items);
  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const auth = await isAuthenticated();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const items = getExperience();
  const index = items.findIndex((e) => e.id === body.id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  items[index] = body;
  saveExperience(items);
  return NextResponse.json(items[index]);
}

export async function DELETE(req: NextRequest) {
  const auth = await isAuthenticated();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  const items = getExperience().filter((e) => e.id !== id);
  saveExperience(items);
  return NextResponse.json({ success: true });
}
