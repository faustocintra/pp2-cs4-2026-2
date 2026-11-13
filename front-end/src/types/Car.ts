export type Car = {
 id: number
 brand: string
 model: string
 color: string
 year_manufacture: number
 imported: boolean
 plates: string
 selling_date: string | null
 // O back-end armazena o preço como Decimal, que é serializado como string
 selling_price: string | number | null
 customer_id: number | null
}
