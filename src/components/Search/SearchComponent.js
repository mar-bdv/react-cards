import React, { useState } from "react";
import PropTypes from "prop-types"; 
import './SearchComponent.css'

const SearchComponent = ({ onSearch, placeholder = "Введите текст для поиска..." }) => {
    const [query, setQuery] = useState(""); 

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="search">
            <input
                type="text"
                className="search__input"
                value={query}
                placeholder={placeholder}
                onChange={handleChange}
            />
        </div>
    );
};

SearchComponent.propTypes = {
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,    
};

export default SearchComponent;
