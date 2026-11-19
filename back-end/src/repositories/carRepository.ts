import { prisma } from "../database/client.js";
import type { CreateCarDto } from "../dto/car/createCarDto.js";
import type { UpdateCarDto } from "../dto/car/updateCarDto.js";

export function findAll() {
 return prisma.car.findMany({
   include: {
     customer: {
       select: { name: true },
     },
   },
   orderBy: { id: "asc" },
 });
}

export function create(data: CreateCarDto) {
 return prisma.car.create({
   data,
 });
}

export function findById(id: number) {
 return prisma.car.findUnique({
   where: { id },
 });
}

export function update(id: number, data: UpdateCarDto) {
 return prisma.car.update({
   where: { id },
   data,
 });
}
