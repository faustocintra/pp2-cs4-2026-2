export interface UpdateCarDto {
  brand?: string;
  model?: string;
  color?: string;
  year_manufacture?: number;
  imported?: boolean;
  plates?: string;
  selling_date?: Date | null;
  selling_price?: number | string | null;
  customer_id?: number | null;
}
