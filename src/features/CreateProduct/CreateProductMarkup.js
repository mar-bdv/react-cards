import React from 'react';

const CreateProductMarkup = ({ formData, validationErrors, handleChange, handleSubmit }) => {
    return (
        <div className="create-product">
            <h2 className="create-product__title">Добавить новый продукт</h2>
            <form className="create-product__form" onSubmit={handleSubmit}>
                <label className="create-product__label">
                    Название:
                    <input
                        className="create-product__input"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    {validationErrors.title && <p className="error">{validationErrors.title}</p>}
                </label>
                <label className="create-product__label">
                    Описание:
                    <textarea
                        className="create-product__input"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    {validationErrors.description && <p className="error">{validationErrors.description}</p>}
                </label>
                <label className="create-product__label">
                    Цена:
                    <input
                        className="create-product__input"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    {validationErrors.price && <p className="error">{validationErrors.price}</p>}
                </label>
                <label className="create-product__label">
                    Изображение (URL):
                    <input
                        className="create-product__input"
                        type="text"
                        name="images"
                        value={formData.images}
                        onChange={handleChange}
                        required
                    />
                    {validationErrors.images && <p className="error">{validationErrors.images}</p>}
                </label>
                <label className="create-product__label">
                    Гарантия:
                    <input
                        className="create-product__input"
                        type="text"
                        name="warrantyInformation"
                        value={formData.warrantyInformation}
                        onChange={handleChange}
                        required
                    />
                    {validationErrors.warrantyInformation && (
                        <p className="error">{validationErrors.warrantyInformation}</p>
                    )}
                </label>
                <label className="create-product__label">
                    Доставка:
                    <input
                        className="create-product__input"
                        type="text"
                        name="shippingInformation"
                        value={formData.shippingInformation}
                        onChange={handleChange}
                        required
                    />
                    {validationErrors.shippingInformation && (
                        <p className="error">{validationErrors.shippingInformation}</p>
                    )}
                </label>
                <label className="create-product__label">
                    Политика возврата:
                    <input
                        className="create-product__input"
                        type="text"
                        name="returnPolicy"
                        value={formData.returnPolicy}
                        onChange={handleChange}
                        required
                    />
                    {validationErrors.returnPolicy && (
                        <p className="error">{validationErrors.returnPolicy}</p>
                    )}
                </label>
                <button className="create-product__button" type="submit">
                    Добавить продукт
                </button>
            </form>
        </div>
    );
};

export default CreateProductMarkup;
