import { prisma } from "../db/prisma";

import type { CreateCustomerDto } from "../dtos/customer/createCustomerDto";
import type { UpdateCustomerDto } from "../dtos/customer/updateCustomerDto";

export function findAll() {
    return prisma.customer.findMany({
    orderBy: {
        name: "asc",
    },
    });
}

export function findById(id: number) {
    return prisma.customer.findUnique({
    where: { id },
    });
}

export function create(data: CreateCustomerDto) {
    return prisma.customer.create({
    data,
    });
}

export function update(id: number, data: UpdateCustomerDto) {
    return prisma.customer.update({
    where: { id },
    data,
    });
}

export function remove(id: number) {
    return prisma.customer.delete({
    where: { id },
    });
}
