import { prisma } from "../database/client.ts";

import type { CreateCarDto }
  from "../dto/car/createCarDto.ts";

import type { UpdateCarDto }
  from "../dto/car/updateCarDto.ts";

export function findAll() {
  return prisma.car.findMany({
    orderBy: {
      model: "asc",
    },
  });
}

export function findById(id: number) {
  return prisma.car.findUnique({
    where: { id },
  });
}

export function create(data: CreateCarDto) {
  return prisma.car.create({
    data,
  });
}

export function update(
  id: number,
  data: UpdateCarDto
) {
  return prisma.car.update({
    where: { id },
    data,
  });
}

export function remove(id: number) {
  return prisma.car.delete({
    where: { id },
  });
}
