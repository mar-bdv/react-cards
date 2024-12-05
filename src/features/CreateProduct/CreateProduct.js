import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CreateProductMarkup from "./CreateProductMarkup"; 
import "./createProduct.css";

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        images: [],
        availabilityStatus: "In Stock",
        warrantyInformation: "",
        shippingInformation: "",
        returnPolicy: "",
    });

    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};

        if (!formData.title || formData.title.length < 3) {
            errors.title = "Название должно содержать минимум 3 символа.";
        }

        if (!formData.description || formData.description.length < 3) {
            errors.description = "Описание должно быть минимум 3 символа.";
        }

        if (!formData.price || formData.price <= 0) {
            errors.price = "Цена должна быть положительным числом.";
        }

        if (!formData.images || !/^https?:\/\/.+/.test(formData.images)) {
            errors.images = "Введите корректный URL изображения.";
        }

        if (!formData.warrantyInformation) {
            errors.warrantyInformation = "Поле гарантии обязательно.";
        }

        if (!formData.shippingInformation) {
            errors.shippingInformation = "Поле доставки обязательно.";
        }

        if (!formData.returnPolicy) {
            errors.returnPolicy = "Поле политики возврата обязательно.";
        }

        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) return;

        const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
        const newProduct = {
            ...formData,
            id: uuidv4(),
            price: parseFloat(formData.price),
            images: [formData.images],
        };

        const updatedProducts = [...existingProducts, newProduct];
        localStorage.setItem("products", JSON.stringify(updatedProducts));

        navigate("/");
    };

    return (
        <CreateProductMarkup
            formData={formData}
            validationErrors={validationErrors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default CreateProduct;
