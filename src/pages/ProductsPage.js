import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/productsApi";
import ProductCard from "./ProductCard";
import Pagination from "../features/Pagination/Pagination";
import "./products.css";
import SearchComponent from "../components/Search/SearchComponent";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productsFromApi = await fetchProducts();
                const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
                const allProducts = [...existingProducts, ...productsFromApi];

                const uniqueProducts = allProducts.filter((product, index, self) =>
                    index === self.findIndex((t) => t.id === product.id)
                );

                setProducts(uniqueProducts);
                setFilteredProducts(uniqueProducts); 
                localStorage.setItem("products", JSON.stringify(uniqueProducts));

                const savedFavorites = JSON.parse(localStorage.getItem("likedProducts") || "[]");
                setFavorites(savedFavorites);
            } catch (err) {
                setError("Failed to fetch products.");
            }
        };

        getProducts();
    }, []);

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = (query) => {
        const cleanedQuery = query.trim(); 
    
        if (!cleanedQuery) {
            setFilteredProducts(products); 
        } else {
            const searchResults = products.filter(product =>
                product.title.toLowerCase().includes(cleanedQuery.toLowerCase())
            );
            setFilteredProducts(searchResults);
        }
    };

    if (error) { 
        return <p>{error}</p>;
    }
    if (products.length === 0) {
        return <p>Загрузка...</p>;
    }

    const handleDelete = (id) => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));

        const updatedFavorites = favorites.filter(product => product.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="product-page">
            <SearchComponent onSearch={handleSearch} placeholder="Поиск товаров..." />

            <div className="product-list">
                {currentProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onDelete={handleDelete}
                        isLiked={favorites.some(fav => fav.id === product.id)}
                    />
                ))}
            </div>
            <Pagination
                totalItems={filteredProducts.length} 
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ProductsPage;
