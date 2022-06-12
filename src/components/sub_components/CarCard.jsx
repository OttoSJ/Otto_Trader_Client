import React from 'react'
import { upperCase, numberWithCommas } from '../../utilities.js/functions'
import { Link } from 'react-router-dom'
import Like from '../../components/sub_components/Like'
import { FaEye } from 'react-icons/fa'

function CarCard({
  filteredCars,
  handleCarDetails,
  handleLiked,
  carId,
  sellerFavorites,
  sellerDashboard,
}) {
  const userInfo = JSON.parse(localStorage.getItem('user'))

  return (
    <>
      <div className="main-container mt-3 mb-2 cursor">
        <main onClick={(e) => handleCarDetails(e, filteredCars)}>
          <img
            className="main-picture"
            src={
              !filteredCars.image
                ? 'https://whetstonefire.org/wp-content/uploads/2020/06/image-not-available.jpg'
                : filteredCars.image
            }
            alt=""
          />
          <Link
            className="sellers-main-message-container"
            to={`/cardetails/${filteredCars._id}`}
          >
            <p className="m-3">
              {filteredCars.year} {upperCase(filteredCars.make)} <br />{' '}
              {upperCase(filteredCars.model)}
              <br />{' '}
              {`$${numberWithCommas(
                filteredCars.listprice
              )} / ${numberWithCommas(filteredCars.mileage)}mi`}
            </p>
          </Link>
        </main>
        <div className="container-flex-row-heart-view">
          {' '}
          <span className="mx-3 pb-3 minus-margin-top ">
            {' '}
            <FaEye /> views 0
          </span>
          {userInfo ? (
            <span className="mx-4 pb-3 minus-margin-top ">
              <Like
                handleLiked={handleLiked}
                filteredCars={filteredCars}
                carId={carId}
                sellerFavorites={sellerFavorites}
                sellerDashboard={sellerDashboard}
              />
            </span>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default CarCard
