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
          <Route path="/payment" element={<Payment />} />
          <Route path="/response/:id" element={<Response />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
