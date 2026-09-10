import { AppError } from './AppError'

//dfs
export class NotFoundError extends AppError {
 constructor(message = 'Recurso não encontrado.') {
   super(message, 404)
   this.name = 'NotFoundError'
 }
}
