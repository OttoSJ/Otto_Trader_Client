import { useParams } from 'react-router-dom'
import { FaCar } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateCarDetails, deleteCar } from '../features/cars/carSlice'
import { getOneCarById } from '../features/carDetails/carDetailsSlice'
import { Form, Button } from 'react-bootstrap'
import Spinner from './Spinner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModalComponent from './sub_components/Modal'
import {
  confirmEditCarMessage,
  confirmCarHeaderMessage,
  confirmedCarMessage,
  confirmDeleteCarMessage,
  vehicleWarningHeaderMessage,
  confirmedDeletedCarMessage,
} from '../utilities.js/variables'
import CarForm from './sub_components/CarForm'

function EditCarDetails({ handleFormData, HTTP }) {
  const [carDetails, setCarDetails] = useState('')
  let {
    _id,
    make,
    year,
    model,
    type,
    listprice,
    color,
    drivetype,
    engine,
    transmission,
    discription,
    image,
    mileage,
    ac,
    leatherseats,
    sunroof,
    bluetooth,
    comments,
    cruisecontrol,
    satradio,
    auxport,
    amfm,
    listVehicle,
  } = carDetails

  let [formData, setFormData] = useState({
    _id: _id,
    make: make,
    model: model,
    year: year,
    type: type,
    listprice: listprice,
    color: color,
    drivetype: drivetype,
    engine: engine,
    transmission: transmission,
    discription: discription,
    image: image,
    mileage: mileage,
    ac: ac,
    leatherseats: leatherseats,
    sunroof: sunroof,
    bluetooth: bluetooth,
    cruisecontrol: cruisecontrol,
    satradio: satradio,
    auxport: auxport,
    amfm: amfm,
    listVehicle: listVehicle,
    comments: comments,
  })
  const [show, setShow] = useState(false)
  const [modalBodyMessage, setModalBodyMessage] = useState('')
  const [modalHeaderMessage, setModalHeaderMessage] = useState('')
  const [modalMessageConfirmed, setModalMessageConfirmed] = useState(false)
  const [cancel, setCancel] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const API_URL = `${HTTP}/api/inventory/cardetails/${params.id}`
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const token = userInfo.token

  const API_URL_UPDATE_CAR_INVENTORY = `${HTTP}/api/users/remove-car-from-inventory/${params.id}`

  const requestUpdateOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: user._id, carId: params.id }),
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    const fetchData = async () => {
      const response = await fetch(API_URL)
      const resData = await response.json()

      setCarDetails(resData)
      setFormData(resData)
    }

    fetchData()
    dispatch(getOneCarById(params.id))
    window.scrollTo(0, 0)
  }, [params.id, API_URL, dispatch, navigate, user])

  const handleOnSubmit = () => {
    setShow(true)
    setCancel(false)
    setModalBodyMessage(confirmEditCarMessage)
    setModalHeaderMessage(confirmCarHeaderMessage)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('Please login or create and account')
    } else {
      handleFormData(e, formData)
      dispatch(updateCarDetails(formData))
    }

    setModalMessageConfirmed(true)
    setModalBodyMessage(confirmedCarMessage)
    setTimeout(() => {
      navigate(`/cardetails/${params.id}`)
    }, 2500)
  }

  const handleCancel = () => {
    setCancel(true)
    setShow(true)
    setModalBodyMessage(confirmDeleteCarMessage)
    setModalHeaderMessage(vehicleWarningHeaderMessage)
  }

  const handleDelete = (e) => {
    const fetchData = async () => {
      const response = await fetch(
        API_URL_UPDATE_CAR_INVENTORY,
        requestUpdateOptions
      )
      const resData = await response.json()
      console.log(resData)
    }
    setModalMessageConfirmed(true)
    setModalBodyMessage(confirmedDeletedCarMessage)
    fetchData()
    dispatch(deleteCar(carDetails._id))
    setTimeout(() => {
      navigate('/sellerdashboard')
    }, 2500)
  }

  const handleClose = () => setShow(false)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const formDetails = () => {
    if (!carDetails) {
      return <Spinner />
    } else {
      return (
        <>
          <ModalComponent
            handleClose={handleClose}
            onSubmit={onSubmit}
            show={show}
            HTTP={HTTP}
            cancel={cancel}
            handleDelete={handleDelete}
            modalBodyMessage={modalBodyMessage}
            modalHeaderMessage={modalHeaderMessage}
            modalMessageConfirmed={modalMessageConfirmed}
          />

          <Form onSubmit={onSubmit} className="row g-3 mt-3">
            <CarForm onChange={onChange} carDetails={carDetails} />

            <div className="col-12 mb-5  container">
              <Button
                onClick={handleCancel}
                className="btn btn-danger col-5 m-2 "
              >
                Delete
              </Button>

              <Button
                variant="primary"
                className="btn btn-dark col-5 m-3"
                onClick={handleOnSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
          <ToastContainer limit={1} />
        </>
      )
    }
  }
  if (!carDetails) {
    return <Spinner />
  }
  return (
    <div>
      <div>
        <div className="mx-5">
          <h1 className="mt-5 headings">
            {' '}
            <FaCar className="mb-1" /> Edit Vehilcle Details
          </h1>
          {formDetails()}
        </div>
      </div>
    </div>
  )
}

export default EditCarDetails
