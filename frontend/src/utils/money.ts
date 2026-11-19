const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatMoney(money: number | string | null | undefined): string {
  if (money === null || money === undefined || money === "") return "N/A";

  const value = Number(money);
  if (Number.isNaN(value)) return "N/A";

  return brl.format(value);
}