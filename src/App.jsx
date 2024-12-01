import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import { Login } from './components/Login';
import { Register } from './components/Register';
import { AuthProvider } from './providers/AuthProvider';
import { Home } from './pages/Home';
import { Profile } from './pages/user/Profile';
import { MainLayout } from './layouts/MainLayout';
import { ProductDetail } from './pages/product/ProductDetail';
import { Products } from './pages/product/Products';
import { Cart } from './pages/Cart';

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User related routes*/}
            <Route path="profile" element={<Profile />} />
            <Route path='cart' element={<Cart />} />
            {/* <Route path="cart" element={<Cart />} /> */}

            <Route path='product'>
              <Route index element={<Products />} />
              <Route path=':id' element={<ProductDetail />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}