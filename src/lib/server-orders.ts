import { promises as fs } from "node:fs";
import path from "node:path";
import { Order } from "@/lib/types";

const ordersFile = path.join(process.cwd(), "data", "orders.json");

async function ensureFile() {
  await fs.mkdir(path.dirname(ordersFile), { recursive: true });

  try {
    await fs.access(ordersFile);
  } catch {
    await fs.writeFile(ordersFile, "[]", "utf8");
  }
}

export async function readOrders() {
  await ensureFile();
  const raw = await fs.readFile(ordersFile, "utf8");

  try {
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

export async function appendOrder(order: Order) {
  const orders = await readOrders();
  orders.unshift(order);
  await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2), "utf8");
  return order;
}
