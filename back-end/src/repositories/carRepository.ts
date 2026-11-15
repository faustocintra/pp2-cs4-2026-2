import { prisma } from "../database/client";

// Importe os DTOs corretos para carros quando criá-los
import type { CreateCarDto } from "../dto/car/createCarDto";
import type { UpdateCarDto } from "../dto/car/updateCarDto";

export function findAll() {
  return prisma.car.findMany({
    orderBy: {
      brand: "asc",
    },
    include: {
      customer: true,
    },
  });
}

export function findById(id: number) {
  return prisma.car.findUnique({
    where: { id },
    include: { customer: true },
  });
}

export function create(data: CreateCarDto) {
  return prisma.car.create({
    data,
  });
}

export function update(id: number, data: UpdateCarDto) {
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
