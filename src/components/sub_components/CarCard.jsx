import React from 'react'
import { upperCase, numberWithCommas } from '../../utilities.js/functions'
import { Link } from 'react-router-dom'

function CarCard({ filteredCars, handleCarDetails }) {
  if (filteredCars.image) console.log('true')
  return (
    <>
      <main
        onClick={(e) => handleCarDetails(e, filteredCars)}
        className="main-container mt-3 mb-2 cursor"
      >
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
            {`$${numberWithCommas(filteredCars.listprice)} / ${numberWithCommas(
              filteredCars.mileage
            )}mi`}
          </p>
        </Link>
      </main>
    </>
  )
}

export default CarCard
