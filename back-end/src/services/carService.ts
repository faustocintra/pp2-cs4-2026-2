import * as repository from "../repositories/carRepository.ts";

import type { Car } from "../../generated/prisma/client.ts";
import type { CreateCarDto } from "../dto/car/createCarDto.ts";
import type { UpdateCarDto } from "../dto/car/updateCarDto.ts";

import { NotFoundError } from "../errors/NotFoundError.ts";

export async function findAll(): Promise<Car[]> {
  return repository.findAll();
}

export async function findById(
  id: number
): Promise<Car> {
  const car = await repository.findById(id);

  if (!car) {
    throw new NotFoundError("Car não encontrado.");
  }

  return car;
}

export async function create(
  data: CreateCarDto
): Promise<Car> {
  return repository.create(data);
}

export async function update(
  id: number,
  data: UpdateCarDto
): Promise<Car> {
  await findById(id);

  return repository.update(id, data);
}

export async function remove(
  id: number
): Promise<Car> {
  await findById(id);

  return repository.remove(id);
}
