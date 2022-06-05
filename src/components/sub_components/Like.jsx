import { FaRegHeart, FaHeart } from 'react-icons/fa'

function Like({ filteredCars, handleLiked, carId, sellerFavorites }) {
  const getFavorites = () => {
    const checkId = (favoritesCars) => favoritesCars === carId
    // console.log(sellerFavorites.some(checkId))
    console.log(sellerFavorites)
    console.log(carId)
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
