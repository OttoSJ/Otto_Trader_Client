import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Registration from './components/Registration'
import HomePage from './components/HomePage'
import SellerDashboard from './components/SellerDashboard'
import CarRegistration from './components/CarRegistration'
import CarDetails from './components/CarDetails'
import EditCarDetails from './components/EditCarDetails'
import { useDispatch } from 'react-redux'
import { getCars } from '../src/features/cars/carSlice'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getAllUsers } from './features/users/usersSlice'
import { GlobalContext } from './utilities.js/GlobalContext'
import EditUserDetails from './components/EditUserDetails'

function App() {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState('')
  const dispatch = useDispatch()

  const API_URL_INVENTORY = `https://otto-trader-api.herokuapp.com/api/inventory/`

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL_INVENTORY)
      const resData = await response.json()

      if (resData.length > 0) {
        setData(resData)
        dispatch(getCars())
      }
    }
    fetchData()
    dispatch(getAllUsers())
  }, [API_URL_INVENTORY, dispatch])

  const handleFormData = (e, formData) => {
    e.preventDefault()
    setFormData(formData)
  }

  return (
    <>
      <Router>
        <Navbar />
        <GlobalContext.Provider value={formData}>
          <Routes>
            <Route />
            <Route path="/" element={<HomePage data={data} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/sellerdashboard" element={<SellerDashboard />} />
            <Route path="/carregistration" element={<CarRegistration />} />
            <Route path="/cardetails/:id" element={<CarDetails />} />
            <Route
              path="/editcardetails/:id"
              element={<EditCarDetails handleFormData={handleFormData} />}
            />
            <Route
              path="/edituserdetails/:userId"
              element={<EditUserDetails />}
            />
          </Routes>
        </GlobalContext.Provider>
      </Router>
    </>
  )
}

export default App
