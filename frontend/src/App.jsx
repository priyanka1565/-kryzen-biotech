
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'

import ProductForm from './pages/ProductForm'
import Navbar from './pages/Navbar'
import ProductList from './pages/ProductList'
import EditProduct from './pages/EditProduct'


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/productf' element={<ProductForm />} />
        <Route path='/productslist' element={<ProductList />} />
        <Route path="/edit-product" element={<EditProduct />} />
      </Routes>
    </>
  )
}

export default App
