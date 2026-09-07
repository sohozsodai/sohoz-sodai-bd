import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await getAdminSession()) return new NextResponse("Unauthorized", { status: 401 });
  const { id } = await params;
  await prisma.product.delete({ where: { id: Number(id) } });
  return NextResponse.redirect(new URL("/admin/products", req.url), 303);
}
