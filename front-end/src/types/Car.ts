export type Car = {
 id: number
 brand: string
 model: string
 color: string
 year_manufacture: number
 imported: boolean
 plates: string
 selling_date: string | null
 // O Prisma serializa Decimal como string no JSON
 selling_price: string | null
 customer_id: number | null
}
