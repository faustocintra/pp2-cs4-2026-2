import { AppError } from './AppError.ts'


export class NotFoundError extends AppError {
 constructor(message = 'Recurso não encontrado.') {
   super(message, 404)
   this.name = 'NotFoundError'
 }
}
