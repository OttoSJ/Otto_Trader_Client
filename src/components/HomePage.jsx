import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pagination from './Pagintation'
import CarCard from './sub_components/CarCard'
import { getOneCarById } from '../features/carDetails/carDetailsSlice'
import Spinner from './Spinner'
import { URL } from '../utilities.js/functions'

function HomePage({ data }) {
  // const [carDataLength, setCarDataLength] = useState([])
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [carsPerPage] = useState(6)
  const [liked, setLiked] = useState(false)
  const indexOfLastCar = currentPage * carsPerPage
  const indexIfFirstCar = indexOfLastCar - carsPerPage
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCarDetails = (e, car) => {
    e.preventDefault()
    dispatch(getOneCarById(car._id))

    const fetchData = async () => {
      const API_URL = `${URL}/api/inventory/cardetails/${car._id}`
      const response = await fetch(API_URL)
      const resData = await response.json()

      await navigate(`/cardetails/${resData._id}`)
    }

    fetchData()
  }
  const handleLiked = (e, car) => {
    e.preventDefault()
    console.log('Car liked!', car._id)
    console.log('userId!', userInfo._id)
    if (liked) {
      setLiked(false)
    } else setLiked(true)
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

  // console.log(newInvntory)

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
                    liked={liked}
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
