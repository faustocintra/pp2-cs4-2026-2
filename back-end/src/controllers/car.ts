import type { Request, Response } from "express";
import { prisma } from "../database/client";

type CarIdParams = {
  id: string;
};

export async function retrieveAll(req: Request, res: Response) {
  try {
    const cars = await prisma.car.findMany({
      orderBy: { model: "asc" },
    });

    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar carros" });
  }
}

export async function retrieveOne(
  req: Request<CarIdParams>,
  res: Response,
) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    res.status(400).json({ message: "Código de veículo inválido." });
    return;
  }

  try {
    const car = await prisma.car.findUnique({ where: { id } });

    if (!car) {
      res.status(404).json({ message: "Veículo não encontrado." });
      return;
    }

    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao carregar veículo." });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const car = await prisma.car.create({
      data: req.body,
    });

    res.status(201).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar carro" });
  }
}

export async function update(req: Request<CarIdParams>, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    res.status(400).json({ message: "Código de veículo inválido." });
    return;
  }

  try {
    const existingCar = await prisma.car.findUnique({ where: { id } });

    if (!existingCar) {
      res.status(404).json({ message: "Veículo não encontrado." });
      return;
    }

    const car = await prisma.car.update({
      where: { id },
      data: {
        ...req.body,
        selling_date: req.body.selling_date
          ? new Date(req.body.selling_date)
          : null,
      },
    });

    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar veículo." });
  }
}