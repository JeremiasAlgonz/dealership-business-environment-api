import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import Home from './pages/Home';
import Index from './pages/Concessionarias';
import Store from './pages/Concessionarias/store';
import Update from './pages/Concessionarias/update';

import IndexCliente from './pages/Clientes'
import StoreCliente from './pages/Clientes/store'
import UpdateCliente from './pages/Clientes/update'

import IndexMotocicleta from './pages/Motocicletas'
import StoreMotocicleta from './pages/Motocicletas/store'
import UpdateMotocicleta from './pages/Motocicletas/update'

import StoreEndereco from './pages/Enderecos/store'
//import UpdateEndereco from './pages/Enderecos/update'


import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/concessionarias" element={<Index />} />
        <Route path="/concessionarias/create" element={<Store />} />
        <Route path="/concessionarias/update/:id" element={<Update />} />

        <Route path="/clientes" element={<IndexCliente />} />
        <Route path="/clientes/create" element={<StoreCliente />} />
        <Route path="/clientes/update/:id" element={<UpdateCliente />} />

        <Route path="/motocicletas" element={<IndexMotocicleta />} />
        <Route path="/motocicletas/create" element={<StoreMotocicleta />} />
        <Route path="/motocicletas/update/:id" element={<UpdateMotocicleta />} />

        <Route path="/enderecos/create" element={<StoreEndereco />} />
  
        {/* Rota de erro 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
