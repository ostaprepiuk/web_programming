import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import HomePage from './components/HomePage.jsx';
import CatalogPage from './components/CatalogPage.jsx';
import FarmDetailsPage from './components/FarmDetailsPage.jsx';
import Cart from './components/Cart.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import SuccessPage from './components/SuccessPage.jsx';

// Стилі для утримання футера внизу (Sticky Footer)
const appStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
};

const mainStyles = {
    flexGrow: 1, 
};

function App() {
    return (
        <Router>
            <div style={appStyles}> 
                <Header />
                <main style={mainStyles}> 
                    <Routes>
                        {/* Усі маршрути тепер знову відкриті */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/catalog" element={<CatalogPage />} />
                        <Route path="/farm/:id" element={<FarmDetailsPage />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<CheckoutPage />} /> 
                        <Route path="/success" element={<SuccessPage />} />
                        <Route path="/about" element={<h2 style={{ padding: '50px', textAlign: 'center' }}>Про нас</h2>} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;