import { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { numberWithCommas } from '../utilities.js/functions'
import { upperCase } from '../utilities.js/functions'
import { getCars } from '../features/cars/carSlice'
import { getAllUsers } from '../features/users/usersSlice'
import { getOneCarById } from '../features/carDetails/carDetailsSlice'
import Spinner from './Spinner'
import { GlobalContext } from '../utilities.js/GlobalContext'

function CarDetails({ HTTP }) {
  const [carDetail, setCarDetail] = useState('')
  const params = useParams()
  const formData = useContext(GlobalContext)
  const dispatch = useDispatch()

  const { allUsers } = useSelector((state) => state.allUsers)

  const API_URL = `${HTTP}/api/inventory/cardetails/${params.id}`

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL)
      const resData = await response.json()

      setCarDetail(resData)
    }
    // Do not remove this line below
    setCarDetail(formData)

    if (!formData) {
      fetchData()
    }

    dispatch(getCars())
    dispatch(getOneCarById(params.id))
    dispatch(getAllUsers())
    window.scrollTo(0, 0)
  }, [params.id, API_URL, dispatch, formData])

  const {
    color,
    image,
    listprice,
    make,
    mileage,
    model,
    type,
    user,
    year,
    engine,
    ac,
    amfm,
    auxport,
    bluetooth,
    comments,
    cruisecontrol,
    drivetype,
    leatherseats,
    satradio,
    sunroof,
    transmission,
  } = carDetail

  if (!carDetail) {
    return <Spinner />
  }

  const ownerInfo = () => {
    const owner = allUsers.filter((ownerDetails) => ownerDetails._id === user)
    if (!owner[0]) {
      return null
    } else {
      const { firstname, lastname, email } = owner[0]
      return (
        <div className="container">
          {' '}
          {!owner[0] ? (
            <p> Loading...</p>
          ) : (
            <p className="minus-margin">Seller: {`${firstname} ${lastname}`}</p>
          )}
          {!owner[0] ? (
            <p> Loading...</p>
          ) : (
            <p className="minus-margin">Email: {`${email}`} </p>
          )}
          {!owner[0] ? (
            <p> Loading...</p>
          ) : (
            <p className="minus-margin">Phone: (555) 555-5534 </p>
          )}
        </div>
      )
    }
  }

  const carInfo = () => {
    if (!carDetail) {
      return null
    } else
      return (
        <div className="container-centered">
          <div className=" container-centered-start">
            <img
              className="car-details-image mt-3"
              src={
                !image
                  ? 'https://ouikar.com/pub/media/catalog/product/placeholder/default/image_not_available.png'
                  : image
              }
              alt=""
            />
          </div>
          <section>
            <h1 className="mt-5 headings">
              <div className="mb-2"> {`${year} ${make.toUpperCase()} `} </div>
              <div> {`${model.toUpperCase()}`} </div>
            </h1>
            <hr />

            <div className="container-flex-row mt-4">
              <div>
                <p>List Price</p>
              </div>
              <div>
                <p>{`$${numberWithCommas(listprice.toFixed(2))}`} </p>
              </div>
            </div>
            <hr />
            <div className="container-flex-row mt-4">
              <div>
                <p>Mileage</p>
              </div>
              <div>
                <p>{`${numberWithCommas(mileage)} `} </p>
              </div>
            </div>
            <hr />
            <div className="container-flex-row mt-4">
              <div>
                <p>Engine Type</p>
              </div>
              <div>
                <p> {engine ? upperCase(engine) : 'N/A'} </p>
              </div>
            </div>
            <hr />
            <div className="container-flex-row mt-4">
              <div>
                <p>Exterior Color</p>
              </div>
              <div>
                <p>{upperCase(color)}</p>
              </div>
            </div>
            <hr />
            <div className="container-flex-row mt-4">
              <div>
                <p>Transmission</p>
              </div>
              <div>
                <p>{drivetype ? upperCase(drivetype) : 'N/A'} </p>
              </div>
            </div>
            <hr />
            <div className="container-flex-row mt-4">
              <div>
                <p>Body Type</p>
              </div>
              <div>
                <p>{type ? upperCase(type) : 'N/A'} </p>
              </div>
            </div>
            <hr />

            <div className="container-flex-row mt-4">
              <div>
                <p>Drive Train</p>
              </div>
              <div>
                <p>{transmission ? upperCase(transmission) : 'N/A'} </p>
              </div>
            </div>
            <hr />
            <div>
              <h1 className="headings mb-5 mt-5 mr-auto">LUXURY OPTIONS</h1>
            </div>
            <hr />
            <div className="container-flex-row mt-4">
              <div>
                <p>A/C</p>
              </div>
              <div>
                <p>{ac ? 'Included' : 'N/A'}</p>
              </div>
            </div>
            <hr />
            <div className="container-flex-row mt-4">
              <div>
                <p>AM/FM</p>
              </div>
              <div>
                <p>{amfm ? 'Included' : 'N/A'}</p>
              </div>
            </div>
            <hr />
            <div className="container-flex-row mt-4">
              <div>
                <p>AUX PORT</p>
              </div>
              <div>
                <p>{auxport ? 'Included' : 'N/A'}</p>
              </div>
            </div>
            <hr />
            <div className="container-flex-row mt-4">
              <div>
                <p>Blue Tooth</p>
              </div>
              <div>
                <p>{bluetooth ? 'Included' : 'N/A'}</p>
              </div>
            </div>
            <hr />
            <div className="container-flex-row mt-4">
              <div>
                <p>Cruise Control</p>
              </div>
              <div>
                <p>{cruisecontrol ? 'Included' : 'N/A'}</p>
              </div>
            </div>
            <hr />
            <div className="container-flex-row mt-4">
              <div>
                <p>Leater Seats</p>
              </div>
              <div>
                <p>{leatherseats ? 'Included' : 'N/A'}</p>
              </div>
            </div>
            <hr />
            <div className="container-flex-row mt-4">
              <div>
                <p>Sat Radio</p>
              </div>
              <div>
                <p>{satradio ? 'Included' : 'N/A'}</p>
              </div>
            </div>
            <hr />
            <div className="container-flex-row mt-4">
              <div>
                <p>Sun Roof</p>
              </div>
              <div>
                <p>{sunroof ? 'Included' : 'N/A'}</p>
              </div>
            </div>
            <hr />
            <div className="container-centered mt-4 mb-5">
              <p>{comments}</p>
            </div>
          </section>
        </div>
      )
  }

  return (
    <>
      <div className="mx-4">
        <div className="headings">
          <h1 className="mb-2"> Car Details </h1>
        </div>
        {ownerInfo()}
        {carInfo()}
      </div>
    </>
  )
}

export default CarDetails
