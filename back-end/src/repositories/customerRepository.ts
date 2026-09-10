import { prisma } from "../database/client.ts";


import type { CreateCustomerDto }
 from "../dto/customer/createCustomerDto.ts";


import type { UpdateCustomerDto }
 from "../dto/customer/updateCustomerDto.ts";


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
    data: {
      ...data,
      birth_date: data.birth_date
        ? new Date(data.birth_date as unknown as string)
        : undefined,
    },
  });
}


export function update(
  id: number,
  data: UpdateCustomerDto
) {
  return prisma.customer.update({
    where: { id },
    data: {
      ...data,
      ...(data.birth_date !== undefined
        ? {
            birth_date: data.birth_date
              ? new Date(data.birth_date as unknown as string)
              : null,
          }
        : {}),
    },
  });
}


export function remove(id: number) {
 return prisma.customer.delete({
   where: { id },
 });
}

