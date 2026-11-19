import type {
 Request,
 Response,
 NextFunction,
} from "express";
import * as service from "../services/carService.ts";
import type { CreateCarDto } from "../dto/car/createCarDto.ts";
import type { UpdateCarDto } from "../dto/car/updateCarDto.ts";

type CarIdParams = {
 id: string;
};

type CreateCarRequest = Request<
 Record<string, never>,
 unknown,
 CreateCarDto
>;

type UpdateCarRequest = Request<
 CarIdParams,
 unknown,
 UpdateCarDto
>;

export async function retrieveAll(
 req: Request,
 res: Response,
 next: NextFunction
): Promise<void> {
 try {
   const cars = await service.findAll();
   res.json(cars);
 }
 catch (error) {
   next(error);
 }
}

export async function create(
 req: CreateCarRequest,
 res: Response,
 next: NextFunction
): Promise<void> {
 try {
   const car = await service.create(req.body);
   res.status(201).json(car);
 }
 catch (error) {
   next(error);
 }
}

export async function retrieveOne(
 req: Request<CarIdParams>,
 res: Response,
 next: NextFunction
): Promise<void> {
 try {
   const car = await service.findById(Number(req.params.id));
   res.json(car);
 }
 catch (error) {
   next(error);
 }
}

export async function update(
 req: UpdateCarRequest,
 res: Response,
 next: NextFunction
): Promise<void> {
 try {
   const car = await service.update(Number(req.params.id), req.body);
   res.json(car);
 }
 catch (error) {
   next(error);
 }
}
