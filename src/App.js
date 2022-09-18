import 'antd/dist/antd.variable.min.css'
import './App.css'
import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Spin } from 'antd'

import ProtectedRoutes from './routes/ProtectedRoutes'
import AuthRoutes from './routes/AuthRoutes'

import NotFoundPage from './pages/ErrorPages/NotFoundPage'
import Theme from './theme'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'

import Dashboard from './pages/Dashboard'
import Bookings, { BookingInfo } from './pages/Bookings'
import Clients, { ClientInfo } from './pages/Clients'
import ServiceCategory from './pages/ServiceCategory'
import ServiceProviders, { ServiceProviderInfo } from './pages/ServiceProviders'
import PaymentMethods from './pages/PaymentMethods'
import Transactions from './pages/Transactions'
import Settings from './pages/Settings'

// import Settings from "./pages/Settings";

const Login = lazy(() => import('./pages/Auth/Login'))
const Signup = lazy(() => import('./pages/Auth/Signup'))

const Loading = () => {
  return (
    <div className='spin'>
      <Spin />
    </div>
  )
}

Theme()

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path='/' element={<AuthRoutes />}>
            <Route path='/login' element={<Login />} />
            <Route path='/create-account' element={<Signup />} />
            <Route path='/reset-password' element={<ForgotPassword />} />
            <Route path='/reset-confirmation' element={<ResetPassword />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Route>

          {/* Private routes  */}
          <Route path='/' element={<ProtectedRoutes />}>
            {/* Other protected pages */}
            <Route
              //
              path='/dashboard'
              element={<Dashboard />}
            />

            <Route
              //
              path='/bookings'
              element={<Bookings />}
            />
            {/* <Route
              //
              path='/bookings/:id'
              element={<BookingInfo />}
            /> */}

            <Route
              //
              path='/clients'
              element={<Clients />}
            />
            <Route
              //
              path='/clients/:id'
              element={<ClientInfo />}
            />
            <Route
              //
              path='/service-category'
              element={<ServiceCategory />}
            />
            <Route
              //
              path='/service-provider/:id'
              element={<ServiceProviderInfo />}
            />
            <Route
              //
              path='/service-provider'
              element={<ServiceProviders />}
            />
            <Route
              //
              path='/payment-method'
              element={<PaymentMethods />}
            />
            <Route
              //
              path='/transactions'
              element={<Transactions />}
            />
            <Route
              //
              path='/settings'
              element={<Settings />}
            />

            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Route>

          {/* Catch all routes -> push to not found page */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
