import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { useEffect } from 'react'

function Like({ filteredCars, handleLiked, carId, sellerFavorites }) {
  useEffect(() => {}, [handleLiked, sellerFavorites])
  console.log('Hi')
  const getFavorites = () => {
    const checkId = (favoritesCars) => favoritesCars === carId
    if (!sellerFavorites) {
      return <FaRegHeart />
    } else
      return (
        <i onClick={(e) => handleLiked(e, filteredCars)} className="cursor">
          {' '}
          {!sellerFavorites.some(checkId) ? (
            <FaRegHeart />
          ) : (
            <FaHeart className="liked" />
          )}
        </i>
      )
  }

  return <> {getFavorites()}</>
}

export default Like
