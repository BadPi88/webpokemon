export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function discountPercent(price: number, compareAt: number) {
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(dateString));
}
