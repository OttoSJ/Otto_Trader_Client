import { Button, Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { numberWithCommas } from '../utilities.js/functions'
import { upperCase } from '../utilities.js/functions'
import ModalComponent from './sub_components/Modal'
import Spinner from './Spinner'
import { addNewFieldMsg, addNewFieldHeader } from '../utilities.js/variables'
import FavoriteCars from './sub_components/FavoriteCars'

function SellerDashboard({ HTTP }) {
  const { user } = useSelector((state) => state.auth)
  const [sellersInventory, setSellersInventory] = useState('')
  const [sellersName, setSellersName] = useState('')
  const [show, setShow] = useState(false)
  const [modalBodyMessage, setModalBodyMessage] = useState('')
  const [modalHeaderMessage, setModalHeaderMessage] = useState('')
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const token = userInfo.token

  const API_URL_GET_USERS_INVENTORY = `${HTTP}/api/users/inventory/${userInfo._id}`

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL_GET_USERS_INVENTORY, requestOptions)
      const resData = await response.json()
      if (response.status === 200 || 201) {
        setLoaded(true)
      }

      setSellersInventory(resData.vehicleinventory)
      setSellersName([
        { prefix: resData.prefix },
        { firstname: resData.firstname },
        { lastname: resData.lastname },
      ])
      setModalBodyMessage(addNewFieldMsg)
      setModalHeaderMessage(addNewFieldHeader)
      !resData.prefix ? setShow(true) : setShow(false)
    }
    fetchData()

    if (!user) {
      navigate('/login')
    }
  }, [user, navigate, API_URL_GET_USERS_INVENTORY])

  const handleCarDetails = (e, car) => {
    e.preventDefault()

    navigate(`/cardetails/${car._id}`)
  }

  const handeleEditCarDetails = (e, car) => {
    e.preventDefault()

    navigate(`/editcardetails/${car._id}`)
  }

  const onSubmit = () => {
    navigate(`/edituserdetails/${userInfo._id}`)
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  if (!loaded) {
    return <Spinner />
  }
  console.log('hi')

  return (
    <>
      <div className="sellers-page-container">
        <div className="headings">
          <h1 className="mb-5">Dashboard</h1>
          <h3 className="mb-3">
            Welcome Back{' '}
            {sellersName ? (
              <>
                {`${sellersName[0].prefix}
                ${sellersName[2].lastname}`}
              </>
            ) : null}
          </h3>
        </div>

        <ModalComponent
          show={show}
          HTTP={HTTP}
          handleClose={handleClose}
          handleShow={handleShow}
          onSubmit={onSubmit}
          modalBodyMessage={modalBodyMessage}
          modalHeaderMessage={modalHeaderMessage}
          sellersName={sellersName}
        />

        <div className="main-display-container">
          {sellersInventory.length > 0 ? (
            sellersInventory.map((car) => (
              <main key={car._id} className="main-container mt-3 mb-2 cursor ">
                <img
                  onClick={(e) => handleCarDetails(e, car)}
                  className="main-picture"
                  src={
                    !car.image
                      ? 'https://whetstonefire.org/wp-content/uploads/2020/06/image-not-available.jpg'
                      : car.image
                  }
                  alt=""
                />
                <div className="sellers-main-message-container">
                  <p className="m-1 mx-3">
                    {car.year} {upperCase(car.make)} <br />{' '}
                    {upperCase(car.model)} <br />{' '}
                    {`$${numberWithCommas(car.listprice)} / ${numberWithCommas(
                      car.mileage
                    )}mi`}
                  </p>
                  <div className="mb-3 mx-3 ">
                    <Button
                      className="btn btn-dark mx-5 mt-2"
                      onClick={(e) => handeleEditCarDetails(e, car)}
                    >
                      Edit Details
                    </Button>
                  </div>
                </div>
              </main>
            ))
          ) : (
            <h6 className="container-centered">You have no inventory</h6>
          )}
        </div>
      </div>
      <section>
        <FavoriteCars />
      </section>
    </>
  )
}

export default SellerDashboard
