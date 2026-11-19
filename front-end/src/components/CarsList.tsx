import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Car } from '../types/Car'

const API_URL = `${import.meta.env.VITE_API_BASE}/cars`

export function CarsList() {
 const [cars, setCars] = useState<Car[]>([])

 useEffect(() => {
   let active = true

   async function fetchCars() {
     try {
       const response = await fetch(API_URL)

       if (!response.ok) {
         throw new Error(`Erro HTTP ${response.status}`)
       }

       const data: Car[] = await response.json()
       if (active) setCars(data)
     }
     catch (error) {
       if (active) {
         const message = error instanceof Error ? error.message : String(error)
         window.alert(`Não foi possível carregar os veículos. ${message}`)
       }
     }
   }

   void fetchCars()
   return () => {
     active = false
   }
 }, [])

 return (
   <>
     <h2 className="h2 mb-3">Listagem de Veículos</h2>

     <p className="text-secondary">
       Total de veículos: {cars.length}
     </p>

     <div className="text-end mb-3">
       <Link
         to="/cars/new"
         className="btn btn-outline-primary"
       >
         Novo veículo
       </Link>
     </div>

     <div className="table-responsive">
       <table className="table table-striped table-hover align-middle">
         <thead className="table-dark">
           <tr>
             <th scope="col">Código</th>
             <th scope="col">Marca</th>
             <th scope="col">Modelo</th>
             <th scope="col">Cor</th>
             <th scope="col">Ano</th>
             <th scope="col">Importado</th>
             <th scope="col">Placas</th>
             <th scope="col">Proprietário</th>
             <th scope="col" className="text-end">Ações</th>
           </tr>
         </thead>
         <tbody>
           {cars.map(car => (
             <tr key={car.id}>
               <td>{car.id}</td>
               <td>{car.brand}</td>
               <td>{car.model}</td>
               <td>{car.color}</td>
               <td>{car.year_manufacture}</td>
               <td>{car.imported ? 'Sim' : 'Não'}</td>
               <td>{car.plates}</td>
               <td>{car.customer?.name ?? 'Não vendido'}</td>
               <td className="text-end">
                 <Link
                   to={`/cars/${car.id}`}
                   className="btn btn-outline-primary"
                   aria-label={`Editar veículo ${car.model}`}
                 >
                   Editar
                 </Link>
               </td>
             </tr>
           ))}

           {cars.length === 0 && (
             <tr>
               <td colSpan={9} className="text-center text-secondary">
                 Nenhum veículo cadastrado.
               </td>
             </tr>
           )}
         </tbody>
       </table>
     </div>
   </>
 )
}
