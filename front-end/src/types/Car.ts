export type Car = {
  id: number;
  brand: string;
  model: string;
  color: string;
  year_manufacture: number;
  imported: boolean;
  plates: string;
  selling_date?: string | null;
  selling_price?: number | null;
  customer_id?: number | null;
};
