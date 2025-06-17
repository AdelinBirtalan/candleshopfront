import "./App.css";
import { useEffect } from "react";
import Navbar from "./NavBar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Shop from "./Shop/Shop";
import Contact from "./Contact/Contact";
import About from "./About/About";
import Cart from "./Cart/Cart";
import AdminPanel from "./AdminPanel/AdminPanel";

function App() {
  useEffect(() => {
    document.title = "CandleShop";
  });

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/manage-candles-xyz123" element={<AdminPanel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
