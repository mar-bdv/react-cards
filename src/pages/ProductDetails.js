import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../api/productsApi";
import LikeButton from "../components/Button/LikeButton";

const ProductDetails = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
        const productData = await fetchProductById(id); 

        if (productData) {
            setProduct(productData);
        } else {
            setError("Товар не найден.");
        }
        };

        getProduct();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }
    
    if (!product) { 
        return <div>Загрузка...</div>; 
    }

    return (
        <div className="product-details">
            <div className="product-details__back" onClick={() => navigate('/')}>
                <p className="product-details__back-text">Вернуться</p>
            </div>
            <div className="product-details__content">
                <div className="product-details__image-wrapper">
                    <img className="product-details__image" src={product.thumbnail || product.images?.[0]} alt={product.title} />
                </div>
                <div className="product-details__info">
                    <h2 className="product-details__title">{product.title}</h2>
                    <p className="product-details__price">${product.price}</p>
                    <div className="product-details__actions">
                        <LikeButton productId={product.id}/>
                    </div>
                    <p className={product.availabilityStatus && product.availabilityStatus.toLowerCase() === 'in stock' ? 'product-card__instock' : 'product-card__outofstock'}>
                        {product.availabilityStatus || 'Status not available'}
                    </p>
            
                    <p className="product-details__description">{product.description}</p>
                    <p className="product-details__warranty">Гарантия: {product.warrantyInformation}</p>
                    <p className="product-details__shipping">Доставка: {product.shippingInformation}</p>
                    <p className="product-details__return">Политика возврата: {product.returnPolicy}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
