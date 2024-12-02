import React, { useEffect, useState } from "react";
import { fetchProperties, deleteProperty } from "../services/api";
import { Link } from "react-router-dom";

const PropertyList = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        try {
            const response = await fetchProperties();
            setProperties(response.data);
        } catch (error) {
            console.error("Error fetching properties", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProperty(id);
            loadProperties(); // Refresh list after delete
        } catch (error) {
            console.error("Error deleting property", error);
        }
    };

    return (
        <div>
            <h1>Property List</h1>
            <ul>
                {properties.map((property) => (
                    <li key={property.id}>
                        {property.title}  {property.purpose} {property.price} {property.status} {property.description}
                        <Link to={`/edit/${property.id}`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(property.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PropertyList;
