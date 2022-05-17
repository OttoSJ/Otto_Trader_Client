import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCar } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { createCar, reset } from '../features/cars/carSlice'
import Spinner from './Spinner'

function CarRegistration() {
  const [loading, setLoading] = useState(true)

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
    // THIS SETTIMEOUT WILL CAUSE A ERROR IN CONSOLE, NEED TO FIND A BETTER SOLUTION
    // setTimeout(() => {
    //   setLoading(false)
    // }, 2000)

    dispatch(reset())
  }, [car, isError, isSuccess, message, navigate, dispatch, loading])

  const onSubmit = (e) => {
    e.preventDefault()

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
    console.log(carData)
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
          <form onSubmit={onSubmit} className="row g-3 mt-3">
            <div className="col-6">
              <label htmlFor="make" className="form-label">
                Make
              </label>
              <input
                autoFocus
                type="text"
                className="form-control"
                name="make"
                id="make"
                placeholder="Make"
                onChange={onChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="model" className="form-label">
                Model
              </label>
              <input
                type="text"
                className="form-control"
                name="model"
                id="model"
                placeholder="Model"
                onChange={onChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="year" className="form-label">
                Year
              </label>
              <input
                type="number"
                className="form-control"
                name="year"
                id="year"
                onChange={onChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="type" className="form-label">
                Body Type
              </label>
              <input
                type="text"
                className="form-control"
                name="type"
                id="type"
                onChange={onChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="listprice" className="form-label">
                Listprice
              </label>
              <input
                type="number"
                className="form-control"
                name="listprice"
                id="listprice"
                onChange={onChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="color" className="form-label">
                Color
              </label>
              <input
                type="text"
                className="form-control"
                name="color"
                id="color"
                onChange={onChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="drivetype" className="form-label">
                Drive Type
              </label>
              <input
                type="text"
                className="form-control"
                name="drivetype"
                id="drivetype"
                placeholder=""
                onChange={onChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="engine" className="form-label">
                Engine
              </label>
              <input
                type="text"
                className="form-control"
                name="engine"
                id="engine"
                onChange={onChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="transmission" className="form-label">
                Transmission
              </label>
              <input
                type="text"
                className="form-control"
                name="transmission"
                id="transmission"
                onChange={onChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="text"
                className="form-control"
                name="image"
                id="image"
                onChange={onChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="mileage" className="form-label">
                Mileage
              </label>
              <input
                type="text"
                className="form-control"
                name="mileage"
                id="mileage"
                onChange={onChange}
              />
            </div>

            {/*  */}
            <div className="headings">
              <h2> Additional Options</h2>
            </div>
            <div className="container">
              <div className="options-container">
                <div className="col-md-2">
                  <label htmlFor="ac" className="form-label">
                    A/C
                  </label>
                  <select
                    id="ac"
                    name="ac"
                    className="form-select"
                    onChange={onChange}
                  >
                    <option value="Choose"> {ac ? 'Yes' : 'No'} </option>
                    <option value="true">Yes </option>
                    <option value="false">No </option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="leatherseats" className="form-label">
                    Leather
                  </label>
                  <select
                    id="leatherseats"
                    name="leatherseats"
                    className="form-select"
                    onChange={onChange}
                  >
                    <option value="Choose">
                      {' '}
                      {leatherseats ? 'Yes' : 'No'}{' '}
                    </option>
                    <option value="true">Yes </option>
                    <option value="false">No </option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="sunroof" className="form-label">
                    Sun Roof
                  </label>
                  <select
                    id="sunroof"
                    name="sunroof"
                    className="form-select"
                    onChange={onChange}
                  >
                    <option value="Choose"> {sunroof ? 'Yes' : 'No'} </option>
                    <option value="true">Yes </option>
                    <option value="false">No </option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="bluetooth" className="form-label">
                    Bluetooth
                  </label>
                  <select
                    id="bluetooth"
                    name="bluetooth"
                    className="form-select"
                    onChange={onChange}
                  >
                    <option value="Choose"> {bluetooth ? 'Yes' : 'No'} </option>
                    <option value="true">Yes </option>
                    <option value="false">No </option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="cruisecontrol" className="form-label">
                    Cruise Cntl
                  </label>
                  <select
                    id="cruisecontrol"
                    name="cruisecontrol"
                    className="form-select"
                    onChange={onChange}
                  >
                    <option value="Choose">
                      {' '}
                      {cruisecontrol ? 'Yes' : 'No'}{' '}
                    </option>
                    <option value="true">Yes </option>
                    <option value="false">No </option>
                  </select>
                </div>
                <div className="col-md-2 ">
                  <label htmlFor="satradio" className="form-label">
                    Sat Radio
                  </label>
                  <select
                    id="satradio"
                    name="satradio"
                    className="form-select"
                    onChange={onChange}
                  >
                    <option value="Choose"> {satradio ? 'Yes' : 'No'} </option>
                    <option value="true">Yes </option>
                    <option value="false">No </option>
                  </select>
                </div>
                <div className="col-md-2 ">
                  <label htmlFor="auxport" className="form-label">
                    Aux Port
                  </label>
                  <select
                    id="auxport"
                    name="auxport"
                    className="form-select"
                    onChange={onChange}
                  >
                    <option value="Choose"> {auxport ? 'Yes' : 'No'} </option>
                    <option value="true">Yes </option>
                    <option value="false">No </option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="amfm" className="form-label">
                    Am/Fm
                  </label>
                  <select
                    id="amfm"
                    name="amfm"
                    className="form-select"
                    onChange={onChange}
                  >
                    <option value="Choose"> {amfm ? 'Yes' : 'No'} </option>
                    <option value="true">Yes </option>
                    <option value="false">No </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-12 mb-5 container">
              <button type="submit" className="btn btn-dark col-8 m-3">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CarRegistration
