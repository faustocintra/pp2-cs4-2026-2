import { prisma } from "../database/client";

// Cria um novo cliente na tabela
export function create(data: any) {}

// Encontra um cliente na tabela por seu id
export function findById(id: number) {}

// Lista todos os clientes da tabela
export function findAll() {}

// Atualiza os dados de um cliente, buscando-o pelo id
export function updateById(id: number, data: any) {}

// Exclui um cliente da tabela, buscando-o por seu id
export function deleteByid(id: number) {}
