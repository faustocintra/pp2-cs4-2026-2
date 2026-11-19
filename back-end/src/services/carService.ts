import * as repository from "../repositories/carRepository.ts";
import type { CreateCarDto } from "../dto/car/createCarDto.ts";
import type { UpdateCarDto } from "../dto/car/updateCarDto.ts";
import { NotFoundError } from "../errors/NotFoundError.ts";

export async function findAll() {
 return repository.findAll();
}

export async function create(data: CreateCarDto) {
 return repository.create(data);
}

export async function findById(id: number) {
 const car = await repository.findById(id);

 if (!car) {
   throw new NotFoundError("Veículo não encontrado.");
 }

 return car;
}

export async function update(id: number, data: UpdateCarDto) {
 await findById(id);
 return repository.update(id, data);
}
