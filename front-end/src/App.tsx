import { CustomersList } from './components/CustomersList'
//import { customers } from './data/customers'


function App() {
 return (
   <>
     <header className="bg-dark text-white py-3">
       <div className="container">
         <h1 className="h4 mb-0">Cadastro de clientes</h1>
       </div>
     </header>


     <main className="container py-4">
       <h2 className="h5 mb-3">Clientes</h2>
       <div className="text-secondary">
         <CustomersList />
       </div>
     </main>
   </>
 )
}


export default App
