import { prisma } from "../db/prisma";

import type { CreateCarDto } from "../dtos/car/createCarDto";
import type { UpdateCarDto } from "../dtos/car/updateCarDto";

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
