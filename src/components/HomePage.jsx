import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pagination from './Pagintation'
import CarCard from './sub_components/CarCard'
import { getOneCarById } from '../features/carDetails/carDetailsSlice'
import Spinner from './Spinner'
import { register } from '../features/auth/authSlice'
import {
  getUserInventory,
  reqOptionsTokenOnly,
  addToFavorites,
  reqOptionsAddFav,
  removeFromFav,
  reqOptionsDeleteFav,
  getCarDetails,
} from '../utilities.js/functions'

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
  const token = userInfo ? userInfo.token : null
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      const fetchData = async () => {
        const response = await fetch(
          getUserInventory(HTTP, userInfo._id),
          reqOptionsTokenOnly(token, 'GET')
        )
        const resData = await response.json()
        const favIds = resData.favorites.map((favorites) => favorites._id)

        setSellerFavorites(favIds)
      }
      fetchData()
    } else return null
  }, [liked, setSellerFavorites])

  const handleCarDetails = (e, car) => {
    e.preventDefault()
    dispatch(getOneCarById(car._id))

    const fetchData = async () => {
      const response = await fetch(getCarDetails(HTTP, car._id))
      const resData = await response.json()

      await navigate(`/cardetails/${resData._id}`)
    }

    fetchData()
  }

  const handleLiked = (e, car) => {
    e.preventDefault()

    const fetchLikeData = async () => {
      const response = await fetch(
        addToFavorites(HTTP, userInfo._id),
        reqOptionsAddFav(token, car._id)
      )
      const resData = await response.json()

      setSellerFavorites(resData.favorites)
    }

    const fetchUnlikeData = async () => {
      const response = await fetch(
        removeFromFav(HTTP, userInfo._id),
        reqOptionsDeleteFav(token, car._id, userInfo._id)
      )
      const resData = await response.json()

      setSellerFavorites(resData.favorites)
    }

    const checkId = (favoritesCars) => favoritesCars === car._id

    if (!sellerFavorites.some(checkId) || sellerFavorites === []) {
      setTimeout(() => {
        setLiked((currentLike) => (currentLike = true))
      }, 1000)
      fetchLikeData()
    } else {
      setTimeout(() => {
        setLiked((currentLike) => (currentLike = false))
      }, 1000)
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
