import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPanel.css";

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    price: "",
    description: "",
    image: "",
    stock: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      // Replace with your desired password
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Please try again.");
    }
  };

  // Fetch products (only if authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            "https://candles-backend-wals.onrender.com"
          );
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }
  }, [isAuthenticated]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (add or update product)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      title: formData.title,
      price: parseFloat(formData.price),
      description: formData.description,
      image: formData.image,
      stock: parseInt(formData.stock),
    };
    try {
      if (isEditing) {
        // Update product
        await axios.put(
          `https://candles-backend-wals.onrender.com/api/products/${formData.id}`,
          productData
        );

        setProducts(
          products.map((p) =>
            p.id === formData.id ? { ...p, ...productData } : p
          )
        );
        alert("Product updated successfully!");
        setIsEditing(false);
      } else {
        // Add new product
        const response = await axios.post(
          "https://candles-backend-wals.onrender.com/api/products",
          productData
        );
        setProducts([...products, response.data]);
        alert("Product added successfully!");
      }
      // Reset form
      setFormData({
        id: null,
        title: "",
        price: "",
        description: "",
        image: "",
        stock: "",
      });
    } catch (error) {
      alert("Error saving product. Please try again.");
      console.error("Error saving product:", error);
    }
  };

  // Handle edit button click
  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      stock: product.stock,
    });
    setIsEditing(true);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://candles-backend-wals.onrender.com/api/products/${id}`
      );
      setProducts(products.filter((p) => p.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      alert("Error deleting product. Please try again.");
      console.error("Error deleting product:", error);
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="admin-panel">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <button type="submit">Login</button>
          {loginError && <p className="error">{loginError}</p>}
        </form>
      </div>
    );
  }

  // Show admin panel if authenticated
  return (
    <div className="admin-panel">
      <h2>Admin Panel - Manage Products</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="title"
          placeholder="Title (e.g., Vanilla Glow)"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (e.g., 15.99)"
          value={formData.price}
          onChange={handleInputChange}
          step="0.01"
          required
        />
        <textarea
          name="description"
          placeholder="Description (e.g., A soothing vanilla-scented candle)"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (e.g., https://imgur.com/abc123.jpg)"
          value={formData.image}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock (e.g., 10)"
          value={formData.stock}
          onChange={handleInputChange}
          required
        />
        <button type="submit">
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>
      <h3>Product List</h3>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price.toFixed(2)} (Stock:{" "}
            {product.stock})
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
