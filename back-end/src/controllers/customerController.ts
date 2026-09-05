import type {
 Request,
 Response,
 NextFunction,
} from "express";


import * as service from "../services/customerService.ts";


import type { CreateCustomerDto } from "../dto/customer/createCustomerDto.ts";
import type { UpdateCustomerDto } from "../dto/customer/updateCustomerDto.ts";


type CustomerIdParams = {
 id: string;
};


type CreateCustomerRequest = Request<
 Record<string, never>,
 unknown,
 CreateCustomerDto
>;


type UpdateCustomerRequest = Request<
 CustomerIdParams,
 unknown,
 UpdateCustomerDto
>;


export async function retrieveAll(
 req: Request,
 res: Response,
 next: NextFunction
): Promise<void> {
 try {
   const customers = await service.findAll();


   res.json(customers);
 }
 catch (error) {
   next(error);
 }
}


export async function retrieveOne(
 req: Request<CustomerIdParams>,
 res: Response,
 next: NextFunction
): Promise<void> {
 try {
   const id = Number(req.params.id);


   const customer = await service.findById(id);


   res.json(customer);
 }
 catch (error) {
   next(error);
 }
}


export async function create(
 req: CreateCustomerRequest,
 res: Response,
 next: NextFunction
): Promise<void> {
 try {
   const customer = await service.create(req.body);


   res.status(201).json(customer);
 }
 catch (error) {
   next(error);
 }
}


export async function update(
 req: UpdateCustomerRequest,
 res: Response,
 next: NextFunction
): Promise<void> {
 try {
   const id = Number(req.params.id);


   const customer = await service.update(
     id,
     req.body
   );


   res.json(customer);
 }
 catch (error) {
   next(error);
 }
}


export async function remove(
 req: Request<CustomerIdParams>,
 res: Response,
 next: NextFunction
): Promise<void> {
 try {
   const id = Number(req.params.id);


   await service.remove(id);


   res.status(204).end();
 }
 catch (error) {
   next(error);
 }
}
