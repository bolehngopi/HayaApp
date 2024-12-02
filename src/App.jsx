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
import { Checkout } from './pages/Checkout';
import { Categories } from './pages/Categories';
import Search from './pages/search/Search';
import Transactions from './pages/user/Transactions';
import { AuthRoute } from './layouts/AuthRoute';
import { AdminLayout } from './layouts/AdminLayout';
import CreateProduct from './pages/admin/product/CreateProduct';
import EditProduct from './pages/admin/product/EditProduct';
import AdminProducts from './pages/admin/Products';

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          <Route element={<MainLayout />}>
            {/* Auth Routes */}
            <Route element={<AuthRoute />}>
              {/* User related routes*/}
              <Route path="profile" element={<Profile />} />
              <Route path='cart' element={<Cart />} />
              <Route path='transactions' element={<Transactions />} />
            </Route>

            <Route path="/" element={<Home />} />
            

            <Route path='product'>
              <Route index element={<Products />} />
              <Route path=':id' element={<ProductDetail />} />
            </Route>

            <Route path='search' element={<Search />} />

            <Route path='categories' element={<Categories />} />
          </Route>

          <Route element={<AuthRoute />}>
            <Route path='checkout' element={<Checkout />} />
          </Route>

          <Route path='admin' element={<AdminLayout />}>
            {/* Create a Product */}
            <Route path="products" element={<AdminProducts />} />
            {/* Create a Product */}
            <Route path="products/create" element={<CreateProduct />} />
            {/* Edit a Product */}
            <Route path="products/:id/edit" element={<EditProduct />} />
          </Route>
        </Routes>
      </AuthProvider >
    </Router>
  )
}