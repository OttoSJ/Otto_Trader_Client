import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pagination from './Pagintation'
import CarCard from './sub_components/CarCard'
import { getOneCarById } from '../features/carDetails/carDetailsSlice'
import Spinner from './Spinner'
import { register } from '../features/auth/authSlice'

function HomePage({ data, HTTP }) {
  // const [carDataLength, setCarDataLength] = useState([])
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [carsPerPage] = useState(6)
  const [liked, setLiked] = useState(false)
  const [sellerFavorites, setSellerFavorites] = useState('')
  const indexOfLastCar = currentPage * carsPerPage
  const indexIfFirstCar = indexOfLastCar - carsPerPage
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const token = userInfo.token
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      setSellerFavorites(resData.favorites)
      console.log('Hi')
    }
    fetchData()
  }, [liked, setSellerFavorites])

  const handleCarDetails = (e, car) => {
    e.preventDefault()
    dispatch(getOneCarById(car._id))

    const fetchData = async () => {
      const API_URL = `${HTTP}/api/inventory/cardetails/${car._id}`
      const response = await fetch(API_URL)
      const resData = await response.json()

      await navigate(`/cardetails/${resData._id}`)
    }

    fetchData()
  }

  const handleLiked = (e, car) => {
    e.preventDefault()
    const API_URL_ADD_TO_FAVORITES = `${HTTP}/api/users/update-user-inventory/${userInfo._id}`

    const API_URL_REMOVE_FROM_FAVORITES = `${HTTP}/api/users/remove-car-from-inventory/${userInfo._id}`

    const requestAddFavOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ favorites: car._id }),
    }

    const requestDeleteFavOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ likedCarId: car._id, userId: userInfo._id }),
    }

    const fetchLikeData = async () => {
      const response = await fetch(
        API_URL_ADD_TO_FAVORITES,
        requestAddFavOptions
      )
      const resData = await response.json()
      console.log(resData.favorites)
      setSellerFavorites(resData.favorites)
    }

    const fetchUnlikeData = async () => {
      const response = await fetch(
        API_URL_REMOVE_FROM_FAVORITES,
        requestDeleteFavOptions
      )
      const resData = await response.json()
      console.log(resData)
      setSellerFavorites(response.favorites)
    }
    // fetchUnlikeData()
    // fetchLikeData()
    const checkId = (favoritesCars) => favoritesCars === car._id

    console.log(sellerFavorites.some(checkId))
    // console.log('UNLIKED!!!')
    // console.log('LIKED!!!')
    if (!sellerFavorites.some(checkId)) {
      setLiked(true)
      fetchLikeData()
    } else {
      setLiked(false)
      fetchUnlikeData()
    }
  }

  const handleSearch = (e, search) => {
    e.preventDefault()
    setQuery(search)
  }

  const paginate = (number) => {
    setCurrentPage(number)
    window.scrollTo(0, 0)
  }

  if (!data) {
    return <Spinner />
  }

  return (
    <>
      <div className="sellers-page-container">
        <div className="headings">
          <h1 className=" styled-header"> Otto Trader</h1>
          <h4>Find your drive!</h4>
        </div>
        <section>
          <form className=" ">
            <div className="container-centered">
              <input
                className="search-bar cursor"
                type="text"
                placeholder="   Search by Make or Model"
                onChange={(e) => handleSearch(e, e.target.value)}
              />
            </div>
          </form>
        </section>
        <div className="main-display-container">
          {data
            ? data
                .filter((filteredCars) => {
                  if (query === '') {
                    return data
                  } else if (
                    filteredCars.make
                      .toLowerCase()
                      .includes(query.toLowerCase())
                  ) {
                    return filteredCars
                  } else if (
                    filteredCars.model
                      .toLowerCase()
                      .includes(query.toLowerCase())
                  ) {
                    return filteredCars
                  }
                })
                .slice(indexIfFirstCar, indexOfLastCar)
                .map((filteredCars) => (
                  <CarCard
                    key={filteredCars._id}
                    filteredCars={filteredCars}
                    handleCarDetails={handleCarDetails}
                    handleLiked={handleLiked}
                    carId={filteredCars._id}
                    sellerFavorites={sellerFavorites}
                  />
                ))
            : null}
        </div>
        <Pagination
          paginate={paginate}
          totalCars={data.length}
          carsPerPage={carsPerPage}
        />
      </div>
    </>
  )
}

export default HomePage
