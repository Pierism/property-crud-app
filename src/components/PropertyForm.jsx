import React, { useState, useEffect } from "react";
import {
  createProperty,
  updateProperty,
  fetchPropertyById,
} from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const PropertyForm = ({ mode }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    purpose: "",
    price: "",
    status: "",
    description: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // For editing, we'll get the property ID from the URL.

  useEffect(() => {
    if (mode === "edit" && id) {
      loadProperty();
    }
  }, [mode, id]);

  const loadProperty = async () => {
    try {
      const response = await fetchPropertyById(id);
      setFormData(response.data);
    } catch (error) {
      console.error("Error loading property", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        await createProperty(formData);
      } else if (mode === "edit") {
        await updateProperty(id, formData);
      }
      navigate("/"); // Redirect to Home after submission.
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div>
      <h1>{mode === "add" ? "Add Property" : "Edit Property"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Purpose:
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">
          {mode === "add" ? "Add" : "Update"} Property
        </button>

        
      </form>
    </div>
  );
};

export default PropertyForm;
