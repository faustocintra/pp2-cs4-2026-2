import { prisma } from "../database/client.ts";


import type { CreateCarDto }
 from "../dto/car/createCarDto.ts";


import type { UpdateCarDto }
 from "../dto/car/updateCarDto.ts";


export async function findAll() {
  const cars = await prisma.car.findMany({
    orderBy: {
      brand: "asc",
    },
  });
  return cars.map((car) => ({
    ...car,
    selling_date: car.selling_date ? car.selling_date.toISOString() : null,
    selling_price: car.selling_price ? Number(car.selling_price) : null,
  }));
}


export async function findById(id: number) {
  const car = await prisma.car.findUnique({
    where: { id },
  });
  if (!car) return car;
  return {
    ...car,
    selling_date: car.selling_date ? car.selling_date.toISOString() : null,
    selling_price: car.selling_price ? Number(car.selling_price) : null,
  };
}


export async function create(data: CreateCarDto) {
  const car = await prisma.car.create({
    data: {
      ...data,
      // O body chega como string (JSON), então convertemos para Date
      selling_date: data.selling_date
        ? new Date(data.selling_date as unknown as string)
        : null,
      // selling_price é Decimal: o Prisma aceita number ou string direto
      selling_price: data.selling_price ?? null,
      // Ausente = não enviado, o banco usa o padrão (NULL)
      customer_id: data.customer_id ?? undefined,
    },
  });
  return {
    ...car,
    selling_date: car.selling_date ? car.selling_date.toISOString() : null,
    selling_price: car.selling_price ? Number(car.selling_price) : null,
  };
}


export async function update(
  id: number,
  data: UpdateCarDto
) {
  const car = await prisma.car.update({
    where: { id },
    data: {
      ...data,
      ...(data.selling_date !== undefined
        ? {
            selling_date: data.selling_date
              ? new Date(data.selling_date as unknown as string)
              : null,
          }
        : {}),
      ...(data.selling_price !== undefined
        ? { selling_price: data.selling_price ?? null }
        : {}),
      // null desvincula o carro do cliente, undefined não mexe no vínculo
      ...(data.customer_id !== undefined
        ? { customer_id: data.customer_id ?? null }
        : {}),
    },
  });
  return {
    ...car,
    selling_date: car.selling_date ? car.selling_date.toISOString() : null,
    selling_price: car.selling_price ? Number(car.selling_price) : null,
  };
}


export function remove(id: number) {
 return prisma.car.delete({
   where: { id },
 });
}
