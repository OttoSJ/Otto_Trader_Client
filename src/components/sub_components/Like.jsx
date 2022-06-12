import { FaRegHeart, FaHeart } from 'react-icons/fa'

function Like({
  filteredCars,
  handleLiked,
  carId,
  sellerFavorites,
  sellerDashboard,
}) {
  const getFavorites = () => {
    const checkId = (favoritesCars) => favoritesCars === carId
    if (!sellerFavorites) {
      return <FaRegHeart />
    } else
      return (
        <i onClick={(e) => handleLiked(e, filteredCars)} className="cursor">
          {' '}
          {!sellerFavorites.some(checkId) && !sellerDashboard ? (
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
