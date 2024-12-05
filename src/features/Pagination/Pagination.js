import React from "react";
import './pagination.css'

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) { 
        return null;
    }

    return (
        <div className="pagination">
            <button 
                className="pagination__button pagination__button--prev"
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                <svg 
                    className="pagination__icon" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        fillRule="evenodd" 
                        clipRule="evenodd" 
                        d="M15 8C15 7.72386 14.7761 7.5 14.5 7.5L2.70711 7.5L5.85355 4.35355C6.04882 4.15829 6.04882 3.84171 5.85355 3.64645C5.65829 3.45118 5.34171 3.45118 5.14645 3.64645L1.14645 7.64645C0.951184 7.84171 0.951184 8.15829 1.14645 8.35355L5.14645 12.3536C5.34171 12.5488 5.65829 12.5488 5.85355 12.3536C6.04882 12.1583 6.04882 11.8417 5.85355 11.6464L2.70711 8.5H14.5C14.7761 8.5 15 8.27614 15 8Z" 
                        fill="black"
                    />
                </svg>
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    className={`pagination__button pagination__button--number ${
                        currentPage === index + 1 ? "pagination__button--active" : ""
                    }`}
                >
                    {index + 1}
                </button>
            ))}
            <button 
                className="pagination__button pagination__button--next"
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
            >
                <svg 
                    className="pagination__icon" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        fillRule="evenodd" 
                        clipRule="evenodd" 
                        d="M1 8C1 7.72386 1.22386 7.5 1.5 7.5L13.2929 7.5L10.1464 4.35355C9.95118 4.15829 9.95118 3.84171 10.1464 3.64645C10.3417 3.45118 10.6583 3.45118 10.8536 3.64645L14.8536 7.64645C15.0488 7.84171 15.0488 8.15829 14.8536 8.35355L10.8536 12.3536C10.6583 12.5488 10.3417 12.5488 10.1464 12.3536C9.95118 12.1583 9.95118 11.8417 10.1464 11.6464L13.2929 8.5H1.5C1.22386 8.5 1 8.27614 1 8Z" 
                        fill="black"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
