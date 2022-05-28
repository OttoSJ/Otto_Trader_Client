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
import { URL } from './utilities.js/functions'
import ErrorPage from './components/ErrorPage'
import Sandbox from '../src/components/Sandbox'

function App() {
  const [data, setData] = useState('')
  const [formData, setFormData] = useState('')
  const dispatch = useDispatch()
  const [HTTP] = useState(URL)

  const API_URL_INVENTORY = `${HTTP}/api/inventory/`

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
        <GlobalContext.Provider value={formData} HTTP={HTTP}>
          <Routes>
            <Route />
            <Route path="/" element={<HomePage data={data} HTTP={HTTP} />} />
            <Route path="/login" element={<Login HTTP={HTTP} />} />
            <Route
              path="/registration"
              element={<Registration HTTP={HTTP} />}
            />
            <Route
              path="/sellerdashboard"
              element={<SellerDashboard HTTP={HTTP} />}
            />
            <Route
              path="/carregistration"
              element={<CarRegistration HTTP={HTTP} />}
            />
            <Route
              path="/cardetails/:id"
              element={<CarDetails HTTP={HTTP} />}
            />
            <Route
              path="/editcardetails/:id"
              element={
                <EditCarDetails handleFormData={handleFormData} HTTP={HTTP} />
              }
            />
            <Route path="/sandbox" element={<Sandbox />} />
            <Route
              path="/edituserdetails/:userId"
              element={<EditUserDetails HTTP={HTTP} />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </GlobalContext.Provider>
      </Router>
    </>
  )
}

export default App
