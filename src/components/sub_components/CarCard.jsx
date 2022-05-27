import React from 'react'
import { upperCase, numberWithCommas } from '../../utilities.js/functions'
import { Link } from 'react-router-dom'
import Like from '../../components/sub_components/Like'

function CarCard({ filteredCars, handleCarDetails }) {
  return (
    <>
      <div className="main-container mt-3 mb-2 cursor">
        <main
          onClick={(e) => handleCarDetails(e, filteredCars)}
          // className=" mt-3 mb-2 cursor"
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
              {`$${numberWithCommas(
                filteredCars.listprice
              )} / ${numberWithCommas(filteredCars.mileage)}mi`}
            </p>
          </Link>
        </main>
        <div className="container-flex-row">
          {' '}
          <span className="mx-4 pb-3 minus-margin-top ">something</span>
          <span className="mx-4 pb-3 minus-margin-top ">
            <Like />
          </span>
        </div>
      </div>
    </>
  )
}

export default CarCard
