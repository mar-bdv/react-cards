import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import CreateProduct from './features/CreateProduct/CreateProduct';
import Navbar from './components/Navbar/Navbar';
import ProductsPage from './pages/ProductsPage';
import './styles/index.css'
import FavoritesPage from './pages/FavoritesPage';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="*" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/create-product" element={<CreateProduct />} />
                <Route path="/favorites" element={<FavoritesPage />} /> 
            </Routes>
        </Router>
    );
}

export default App;