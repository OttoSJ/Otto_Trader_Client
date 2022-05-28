import { useState } from 'react'
import React from 'react'

import { FaRegHeart, FaHeart } from 'react-icons/fa'

function Sandbox() {
  const [liked, setLiked] = useState(false)
  const [array, setArray] = useState(['1234', '5678', '9012'])

  let carId = '1234'

  // The array will be the customers favorites array of liked cars. The id that I'm comparing it too is the current carId being passed from the HomePage component
  const checkId = (carLiked) => carLiked === carId
  console.log(array.some(checkId))

  const handleLiked = (car) => {
    console.log('Car liked!', car.carId)

    if (car.liked) {
      car.liked = false
    } else setLiked(true)
  }
  return (
    <>
      {' '}
      {array.map((car) => (
        <div key={car}>
          <div>
            {' '}
            <i
              onClick={(e) => handleLiked(car)}
              className="cursor container mt-5"
            >
              {!array.some(checkId) ? (
                <FaRegHeart />
              ) : (
                <FaHeart className="liked" />
              )}
            </i>
          </div>
        </div>
      ))}
    </>
  )
}

export default Sandbox
