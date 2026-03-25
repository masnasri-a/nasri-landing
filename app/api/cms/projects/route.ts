import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getProjects, saveProjects } from "@/lib/data";
import type { Project } from "@/lib/data";

export async function GET() {
  const auth = await isAuthenticated();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getProjects());
}

export async function POST(req: NextRequest) {
  const auth = await isAuthenticated();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const projects = getProjects();
  const newProject: Project = {
    ...body,
    id: Date.now().toString(),
  };
  projects.push(newProject);
  saveProjects(projects);
  return NextResponse.json(newProject, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const auth = await isAuthenticated();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === body.id);
  if (index === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  projects[index] = body;
  saveProjects(projects);
  return NextResponse.json(projects[index]);
}

export async function DELETE(req: NextRequest) {
  const auth = await isAuthenticated();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  const projects = getProjects().filter((p) => p.id !== id);
  saveProjects(projects);
  return NextResponse.json({ success: true });
}
