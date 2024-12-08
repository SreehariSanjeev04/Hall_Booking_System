import { useState } from 'react'
import DashBoard from '../pages/dashboard.jsx'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Booking from '../pages/booking.jsx'
import {Toaster, toast} from 'sonner'
import AdminPanel from '../pages/admin.jsx'
function App() {

  return (
    <Router>
      <Toaster position="top-right" richColors/>
      <Routes>
        
        <Route path="/" element={<DashBoard />} />
        <Route path="/booking/:hall_name" element={<Booking />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  )
}

export default App
