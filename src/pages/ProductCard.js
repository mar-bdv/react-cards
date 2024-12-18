import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../components/Button/LikeButton";

const ProductCard = ({ product, onDelete }) => {
    const [isLiked, setIsLiked] = useState(false);
    
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        const target = e.target;
        const isButton = target.tagName === "BUTTON"; 
        const isLikeIcon = target.classList.contains("like-icon"); 

        if (isButton || isLikeIcon) {
            return; 
        }

        navigate(`/products/${product.id}`);
    };

    useEffect(() => {
        const likedProducts = JSON.parse(localStorage.getItem("likedProducts") || "[]");
        if (likedProducts.includes(product.id)) {
            setIsLiked(true);
        }
    }, [product.id]);
    

    return (
        <div className="product-card" onClick={handleCardClick}>
            <img 
                className="product-card__image" 
                src={product.thumbnail || product.images?.[0]}
                alt={product.title} 
                loading="lazy"
            />
            <div className="product-card__title-container">
                <p className="product-card__title">{product.title}</p>
                <p className="product-card__price">${product.price}</p>
            </div>

            <div className="product-card__actions">
                <LikeButton productId={product.id}/>
                <button 
                    className="product-card__button product-card__button--delete" 
                    onClick={(e) => {e.stopPropagation(); onDelete(product.id)}}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.125 1.25H11.875C12.2202 1.25 12.5 1.52982 12.5 1.875V3.125H7.5V1.875C7.5 1.52982 7.77982 1.25 8.125 1.25ZM13.75 3.125V1.875C13.75 0.839466 12.9105 0 11.875 0H8.125C7.08947 0 6.25 0.839466 6.25 1.875V3.125H3.13207C3.12782 3.12496 3.12356 3.12496 3.1193 3.125H1.875C1.52982 3.125 1.25 3.40482 1.25 3.75C1.25 4.09518 1.52982 4.375 1.875 4.375H2.548L3.61395 17.6994C3.71789 18.9986 4.80259 20 6.10599 20H13.894C15.1974 20 16.2821 18.9986 16.386 17.6994L17.452 4.375H18.125C18.4702 4.375 18.75 4.09518 18.75 3.75C18.75 3.40482 18.4702 3.125 18.125 3.125H16.8807C16.8764 3.12496 16.8722 3.12496 16.8679 3.125H13.75ZM16.198 4.375L15.14 17.5997C15.0881 18.2493 14.5457 18.75 13.894 18.75H6.10599C5.45429 18.75 4.91194 18.2493 4.85997 17.5997L3.802 4.375H16.198ZM6.8383 5.62608C7.18288 5.60581 7.47865 5.86872 7.49892 6.2133L8.12392 16.8383C8.14419 17.1829 7.88128 17.4787 7.5367 17.4989C7.19212 17.5192 6.89635 17.2563 6.87608 16.9117L6.25108 6.2867C6.23081 5.94212 6.49372 5.64635 6.8383 5.62608ZM13.1617 5.62608C13.5063 5.64635 13.7692 5.94212 13.7489 6.2867L13.1239 16.9117C13.1037 17.2563 12.8079 17.5192 12.4633 17.4989C12.1187 17.4787 11.8558 17.1829 11.8761 16.8383L12.5011 6.2133C12.5213 5.86872 12.8171 5.60581 13.1617 5.62608ZM10 5.625C10.3452 5.625 10.625 5.90482 10.625 6.25V16.875C10.625 17.2202 10.3452 17.5 10 17.5C9.65482 17.5 9.375 17.2202 9.375 16.875V6.25C9.375 5.90482 9.65482 5.625 10 5.625Z" 
                    />
                    </svg>
                </button>
            </div>

            <p className={product.availabilityStatus && product.availabilityStatus.toLowerCase() === 'in stock' ? 'product-card__instock' : 'product-card__outofstock'}>
                {product.availabilityStatus || 'Status not available'}
            </p>

            
        </div>
    );
};

export default ProductCard;
