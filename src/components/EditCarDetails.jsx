import { useParams } from 'react-router-dom'
import { FaCar } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateCarDetails, deleteCar } from '../features/cars/carSlice'
import { upperCase, numberWithCommas } from '../utilities.js/functions'
import { getOneCarById } from '../features/carDetails/carDetailsSlice'
import Spinner from './Spinner'
import { toast } from 'react-toastify'

function EditCarDetails({ handleFormData }) {
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
    // comments,
    cruisecontrol,
    satradio,
    auxport,
    amfm,
    // createdAt,
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
  })

  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const API_URL = `https://otto-trader-api.herokuapp.com/api/inventory/cardetails/${params.id}`
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const token = userInfo.token

  const API_URL_UPDATE_CAR_INVENTORY = `https://otto-trader-api.herokuapp.com/api/users/remove-car-from-inventory/${params.id}`

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

  const onSubmit = (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('Please login or create and account')
    } else {
      handleFormData(e, formData)
      dispatch(updateCarDetails(formData))
      navigate(`/cardetails/${params.id}`)
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
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

    fetchData()
    dispatch(deleteCar(carDetails._id))
    navigate('/sellerdashboard')
  }

  const formDetails = () => {
    if (!carDetails) {
      return <Spinner />
    } else {
      return (
        <form onSubmit={onSubmit} className="row g-3 mt-3">
          <div className="col-6">
            <label htmlFor="make" className="form-label">
              Make
            </label>
            <input
              defaultValue={upperCase(make)}
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
              defaultValue={upperCase(model)}
              type="text"
              className="form-control"
              name="model"
              id="model"
              placeholder="Model"
              onChange={onChange}
            />
          </div>

          <div className="col-6">
            <label htmlFor="year" className="form-label">
              Year
            </label>
            <input
              defaultValue={year}
              type="number"
              className="form-control"
              name="year"
              id="year"
              onChange={onChange}
            />
          </div>
          <div className="col-6">
            <label htmlFor="type" className="form-label">
              Body Type
            </label>
            <input
              defaultValue={upperCase(type)}
              type="text"
              className="form-control"
              name="type"
              id="type"
              onChange={onChange}
            />
          </div>
          <div className="col-6">
            <label htmlFor="listprice" className="form-label">
              Listprice
            </label>
            <input
              defaultValue={`$${numberWithCommas(listprice)}`}
              type="text"
              className="form-control"
              name="listprice"
              id="listprice"
              onChange={onChange}
            />
          </div>
          <div className="col-6">
            <label htmlFor="color" className="form-label">
              Color
            </label>
            <input
              defaultValue={upperCase(color)}
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
              defaultValue={upperCase(drivetype ? drivetype : 'N/A')}
              type="text"
              className="form-control"
              name="drivetype"
              id="drivetype"
              placeholder=""
              onChange={onChange}
            />
          </div>

          <div className="col-6">
            <label htmlFor="engine" className="form-label">
              Engine
            </label>
            <input
              defaultValue={upperCase(engine ? engine : 'N/A')}
              type="text"
              className="form-control"
              name="engine"
              id="engine"
              onChange={onChange}
            />
          </div>

          <div className="col-6">
            <label htmlFor="transmission" className="form-label">
              Transmission
            </label>
            <input
              defaultValue={upperCase(transmission ? transmission : 'N/A')}
              type="text"
              className="form-control"
              name="transmission"
              id="transmission"
              onChange={onChange}
            />
          </div>

          <div className="col-6">
            <label htmlFor="mileage" className="form-label">
              Mileage
            </label>
            <input
              defaultValue={numberWithCommas(mileage)}
              type="text"
              className="form-control"
              name="mileage"
              id="mileage"
              onChange={onChange}
            />
          </div>

          <div
            className="col-12
          "
          >
            <label htmlFor="image" className="form-label ">
              Image
            </label>
            <input
              defaultValue={image}
              type="text"
              className="form-control"
              name="image"
              id="image"
              onChange={onChange}
            />
          </div>

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
                  className="form-select select-box-size"
                  onChange={onChange}
                  defaultValue={ac}
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
                  className="form-select select-box-size"
                  onChange={onChange}
                >
                  <option value="Choose">
                    {' '}
                    {leatherseats ? 'Yes' : 'No'}{' '}
                  </option>

                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="sunroof" className="form-label">
                  Sun Roof
                </label>
                <select
                  id="sunroof"
                  name="sunroof"
                  className="form-select select-box-size"
                  onChange={onChange}
                >
                  <option value="Choose"> {sunroof ? 'Yes' : 'No'} </option>

                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="bluetooth" className="form-label">
                  Bluetooth
                </label>
                <select
                  id="bluetooth"
                  name="bluetooth"
                  className="form-select select-box-size"
                  onChange={onChange}
                >
                  <option value="Choose"> {bluetooth ? 'Yes' : 'No'} </option>

                  <option value="true">Yes </option>
                  <option value="false">No </option>
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="cruisecontrol" className="form-label">
                  Cruise Control
                </label>
                <select
                  id="cruisecontrol"
                  name="cruisecontrol"
                  className="form-select select-box-size"
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
                  className="form-select select-box-size"
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
                  className="form-select select-box-size"
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
                  className="form-select select-box-size"
                  onChange={onChange}
                >
                  <option value="Choose"> {amfm ? 'Yes' : 'No'} </option>
                  <option value="true">Yes </option>
                  <option value="false">No </option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-12 mb-5  container">
            <button
              onClick={(e) => handleDelete(e)}
              className="btn btn-danger col-5 m-2 "
            >
              Delete
            </button>
            <button type="submit" className="btn btn-dark col-5 m-2 ">
              Submit
            </button>
          </div>
        </form>
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
