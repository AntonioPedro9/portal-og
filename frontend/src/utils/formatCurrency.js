export default function formatCurrency(number) {
  return number.toLocaleString("pt-br", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });
}
