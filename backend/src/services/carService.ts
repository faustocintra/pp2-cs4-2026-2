import * as repository from "../repositories/carRepository";

import type { Car } from "../../generated/prisma/client";
import type { CreateCarDto } from "../dtos/car/createCarDto";
import type { UpdateCarDto } from "../dtos/car/updateCarDto";

import { NotFoundError } from "../errors/NotFoundError";

export async function findAll(): Promise<Car[]> {
    return repository.findAll();
}

export async function findById(id: number): Promise<Car> {
    const car = await repository.findById(id);

    if (!car) {
        throw new NotFoundError("Car não encontrado.");
    }

    return car;
}

export async function create(data: CreateCarDto): Promise<Car> {
    return repository.create(data);
}

export async function update(id: number, data: UpdateCarDto): Promise<Car> {
    await findById(id);

    return repository.update(id, data);
}

export async function remove(id: number): Promise<Car> {
    await findById(id);

    return repository.remove(id);
}
