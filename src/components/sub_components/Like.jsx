import { FaRegHeart, FaHeart } from 'react-icons/fa'

function Like({ handleLiked, liked, filteredCars }) {
  return (
    <i onClick={(e) => handleLiked(e, filteredCars)} className="cursor">
      {' '}
      {!liked ? <FaRegHeart /> : <FaHeart className="liked" />}
    </i>
  )
}

export default Like
