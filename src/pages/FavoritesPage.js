import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; 
import { fetchProductById } from "../api/productsApi"; 

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]); 

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("likedProducts") || "[]");

        const validFavorites = savedFavorites.filter(id => id != null);

        const loadFavorites = async () => {
            try {
                const fetchedFavorites = await Promise.all(
                    validFavorites.map(async (id) => {
                        const product = await fetchProductById(id); 
                        return product; 
                    })
                );
                setFavorites(fetchedFavorites); 
            } catch (error) {
                setError("Ошибка при загрузке данных о товарах.");
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, []);

    const toggleLike = (id) => {
        const updatedFavorites = favorites.filter(product => product.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem("likedProducts", JSON.stringify(updatedFavorites.map(product => product.id)));
    };

    const deleteProduct = (id) => {
        const updatedFavorites = favorites.filter(product => product.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem("likedProducts", JSON.stringify(updatedFavorites.map(product => product.id)));

        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
    };

    if (loading) {
        return <p>Загрузка...</p>;
    }
    if (error) { 
        return <p>{error}</p>;
    }
    if (favorites.length === 0) {
        return <p className="no-favorites">Нет товаров в избранном.</p>;
    } 

    return (
        <div className="product-list">
            {favorites.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onToggleLike={() => toggleLike(product.id)} 
                    onDelete={() => deleteProduct(product.id)} 
                />
            ))}
        </div>
    );
};

export default FavoritesPage;
