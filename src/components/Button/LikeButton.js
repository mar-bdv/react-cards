import React, { useState, useEffect } from "react";
import './likeButton.css'

const LikeButton = ({ productId }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("likedProducts") || "[]");
        setIsFavorite(favorites.includes(productId));
    }, [productId]);

    const handleToggleFavorite = (e) => {
        e.stopPropagation();

        const favorites = JSON.parse(localStorage.getItem("likedProducts") || "[]");
        let updatedFavorites;

        if (isFavorite) {
            updatedFavorites = favorites.filter((id) => id !== productId);
        } else {
            updatedFavorites = [...favorites, productId];
        }

        localStorage.setItem("likedProducts", JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <button
            onClick={handleToggleFavorite}
            className="favorite-button"
        >
            {isFavorite 
            ? 
            <svg width="20" height="20" viewBox="0 0 80 75" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 13.7403L36.4162 10.0567C27.9945 1.40033 12.5707 4.38847 7.00179 15.2642C4.38267 20.3792 3.79375 27.7623 8.57146 37.1879C13.1729 46.2657 22.7384 57.1323 40 68.9729C57.2617 57.1323 66.8271 46.2657 71.4286 37.1879C76.2063 27.7623 75.6173 20.3792 72.9982 15.2642C67.4293 4.38847 52.0055 1.40033 43.5838 10.0567L40 13.7403ZM40 75C-36.6656 24.342 16.3938 -15.2043 39.1216 5.71541C39.4197 5.98984 39.7127 6.27467 40 6.57002C40.2873 6.27469 40.5802 5.98987 40.8784 5.71546C63.6061 -15.2044 116.666 24.342 40 75Z" fill="#2E86AB"/>
            <path d="M76.0031 27.9166C76.0745 49.8705 53.0073 63.26 39.7566 71.575C27.5073 63.2567 11.5057 50.7795 6.50369 34.1454C-5.49809 19.5897 19.9982 -11.0749 39.7494 12.8379C53.9991 -4.31321 75.9318 5.96272 76.0031 27.9166Z" fill="#2E86AB"/>
            </svg>
            : 
            <svg width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3.43506L9.10406 2.51417C6.99863 0.350084 3.14268 1.09712 1.75045 3.81605C1.09567 5.09479 0.948438 6.94058 2.14286 9.29697C3.29322 11.5664 5.68459 14.2831 10 17.2432C14.3154 14.2831 16.7068 11.5664 17.8571 9.29697C19.0516 6.94058 18.9043 5.09479 18.2496 3.81605C16.8573 1.09712 13.0014 0.350084 10.8959 2.51417L10 3.43506ZM10 18.75C-9.16641 6.08551 4.09845 -3.80108 9.7804 1.42885C9.85493 1.49746 9.92816 1.56867 10 1.64251C10.0718 1.56867 10.1451 1.49747 10.2196 1.42886C15.9015 -3.8011 29.1664 6.0855 10 18.75Z"/>
            </svg>
            }
        </button>
    );
};

export default LikeButton;
