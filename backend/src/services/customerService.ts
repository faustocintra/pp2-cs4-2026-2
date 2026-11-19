import * as repository from "../repositories/customerRepository";

import type { Customer } from "../../generated/prisma/client";
import type { CreateCustomerDto } from "../dtos/customer/createCustomerDto";
import type { UpdateCustomerDto } from "../dtos/customer/updateCustomerDto";

import { NotFoundError } from "../errors/NotFoundError";

export async function findAll(): Promise<Customer[]> {
    return repository.findAll();
}

export async function findById(id: number): Promise<Customer> {
    const customer = await repository.findById(id);

    if (!customer) {
    throw new NotFoundError("Customer não encontrado.");
    }

    return customer;
}

export async function create(data: CreateCustomerDto): Promise<Customer> {
    return repository.create(data);
}

export async function update(id: number, data: UpdateCustomerDto): Promise<Customer> {
    await findById(id);

    return repository.update(id, data);
}

export async function remove(id: number): Promise<Customer> {
    await findById(id);

    return repository.remove(id);
}
