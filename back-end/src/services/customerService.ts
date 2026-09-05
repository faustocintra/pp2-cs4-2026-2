import * as repository from "../repositories/customerRepository.ts";


import type { Customer } from "../generated/prisma/client.ts";
import type { CreateCustomerDto } from "../dto/customer/createCustomerDto.ts";
import type { UpdateCustomerDto } from "../dto/customer/updateCustomerDto.ts";


import { NotFoundError } from "../errors/NotFoundError.ts";


export async function findAll(): Promise<Customer[]> {
 return repository.findAll();
}


export async function findById(
 id: number
): Promise<Customer> {
 const customer = await repository.findById(id);


 if (!customer) {
   throw new NotFoundError("Customer não encontrado.");
 }


 return customer;
}


export async function create(
 data: CreateCustomerDto
): Promise<Customer> {
 return repository.create(data);
}


export async function update(
 id: number,
 data: UpdateCustomerDto
): Promise<Customer> {
 await findById(id);


 return repository.update(id, data);
}


export async function remove(
 id: number
): Promise<Customer> {
 await findById(id);


 return repository.remove(id);
}
