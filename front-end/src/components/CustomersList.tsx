import type { Customer } from '../types/Customer'


type CustomerListProps = {
 list?: Customer[]
}


export function CustomersList({ list = [] }: CustomerListProps) {
 return (
   <p className="text-secondary">
     Total de clientes: {list.length}
   </p>
 )
}
