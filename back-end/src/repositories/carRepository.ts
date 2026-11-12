import { prisma } from "../database/client";

import type { CreateCarDto } from "../dto/car/createCarDto.ts";
import type { UpdateCarDto } from "../dto/car/updateCarDto.ts";

// Lista todos os carros, ordenados pela marca
export function findAll() {
  return prisma.car.findMany({
    orderBy: {
      brand: "asc",
    },
    include: {
      customer: {
        select: {
          name: true,
        },
      },
    },
  });
}

// Encontra um carro pelo seu ID
export function findById(id: number) {
  return prisma.car.findUnique({
    where: { id },
  });
}

// Cadastra um novo carro
export function create(data: CreateCarDto) {
  return prisma.car.create({
    data,
  });
}

// Atualiza os dados de um carro pelo ID
export function update(id: number, data: UpdateCarDto) {
  return prisma.car.update({
    where: { id },
    data,
  });
}

// Exclui um carro pelo ID
export function remove(id: number) {
  return prisma.car.delete({
    where: { id },
  });
}
