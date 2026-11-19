import * as repository from "../repositories/carRepository";
import type { CreateCarDto } from "../dto/car/createCarDto";
import type { UpdateCarDto } from "../dto/car/updateCarDto";

export async function findAll() {
  return repository.findAll();
}

export async function findById(id: number) {
  return repository.findById(id);
}

export async function create(data: CreateCarDto) {
  return repository.create(data);
}

export async function update(id: number, data: UpdateCarDto) {
  return repository.update(id, data);
}

export async function remove(id: number) {
  return repository.remove(id);
}