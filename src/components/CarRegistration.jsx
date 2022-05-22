import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCar } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { createCar, reset } from '../features/cars/carSlice'
import { Button, Form } from 'react-bootstrap'
import ModalComponent from './sub_components/Modal'
import Spinner from './Spinner'
import {
  confirmAddVehicleMessage,
  confirmNewCarHeaderMessage,
  confirmedNewCarMessage,
} from '../utilities.js/variables'
import CarForm from './sub_components/CarForm'

function CarRegistration({ HTTP }) {
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [modalMessageConfirmed, setModalMessageConfirmed] = useState(false)
  const [modalBodyMessage, setModalBodyMessage] = useState('')
  const [modalHeaderMessage, setModalHeaderMessage] = useState('')
  const [cancel] = useState(false)
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const [formData, setFromData] = useState({
    make: '',
    model: '',
    year: '',
    type: '',
    listprice: '',
    color: '',
    drivetype: '',
    engine: '',
    transmission: '',
    discription: '',
    image: '',
    mileage: '',
    ac: '',
    leatherseats: '',
    sunroof: '',
    bluetooth: '',
    cruisecontrol: '',
    satradio: '',
    auxport: '',
    amfm: '',
  })

  const {
    make,
    model,
    year,
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
    cruisecontrol,
    satradio,
    auxport,
    amfm,
  } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { car, isError, isSuccess, message } = useSelector(
    (state) => state.cars
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(reset())
  }, [car, isError, isSuccess, message, navigate, dispatch, loading])

  const handleOnSubmit = () => {
    setShow(true)
    setModalBodyMessage(confirmAddVehicleMessage)
    setModalHeaderMessage(confirmNewCarHeaderMessage)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setModalMessageConfirmed(true)
    const carData = {
      make,
      model,
      year,
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
      cruisecontrol,
      satradio,
      auxport,
      amfm,
    }

    setModalBodyMessage(confirmedNewCarMessage)
    dispatch(createCar(carData))
    setTimeout(() => {
      navigate('/sellerdashboard')
    }, 2500)
  }

  const onChange = (e) => {
    setFromData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleClose = () => setShow(false)

  // if (loading) {
  //   return <Spinner />
  // }

  return (
    <div>
      <div>
        <div className="mx-5">
          <h1 className="mt-5 headings">
            {' '}
            <FaCar className="mb-1" /> Register Vehilcle
            <p className="p-5">Please Register Your Vehicle!</p>
          </h1>

          <ModalComponent
            handleClose={handleClose}
            onSubmit={onSubmit}
            show={show}
            HTTP={HTTP}
            cancel={cancel}
            modalBodyMessage={modalBodyMessage}
            modalHeaderMessage={modalHeaderMessage}
            modalMessageConfirmed={modalMessageConfirmed}
          />

          <Form onSubmit={onSubmit} className="row g-3 mt-3">
            <CarForm onChange={onChange} carDetails={formData} />

            <div className="col-12 mb-5 container">
              <Button
                variant="primary"
                className="btn btn-dark col-8 m-3"
                onClick={handleOnSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default CarRegistration
