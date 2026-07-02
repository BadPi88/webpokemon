import { NextResponse } from "next/server";
import { appendOrder, readOrders } from "@/lib/server-orders";
import { Order } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  const orders = await readOrders();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const order = (await request.json()) as Order;
  const saved = await appendOrder(order);
  return NextResponse.json(saved, { status: 201 });
}
