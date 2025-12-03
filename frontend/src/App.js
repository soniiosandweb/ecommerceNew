import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import Home from './Pages/Home/Home';
import Response from './Components/PaymentGateways/Response';
import Payment from './Pages/Payment/Payment';
import Register from './Pages/Register/Register';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './Store/Actions/userActions';
import Login from './Pages/Login/Login';
import Cart from './Pages/Cart/Cart';
import ProtectedRoute from './ProtectedRoute';
import Checkout from './Pages/Checkout/Checkout';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyOrders from './Pages/Dashboard/MyOrders/MyOrders';
import OrderDetails from './Pages/Dashboard/MyOrders/OrderDetails';
import UpdatePassword from './Pages/Dashboard/UpdatePassword/UpdatePassword';
import Address from './Pages/Dashboard/Address/Address';
import Wishlists from './Pages/Dashboard/Wishlists/Wishlists';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          <Route path="/response/:id" element={<Response />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/password" element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/address" element={
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/orders" element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/wishlist" element={
            <ProtectedRoute>
              <Wishlists />
            </ProtectedRoute>
          } />

          <Route path="/order-details/:id" element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }></Route>

          <Route path='*' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
