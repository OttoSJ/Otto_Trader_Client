import { FaRegHeart, FaHeart } from 'react-icons/fa'

function Like({ filteredCars, liked, handleLiked }) {
  return (
    <i onClick={(e) => handleLiked(e, filteredCars)} className="cursor">
      {' '}
      {/* This condittion will change once the database model is updated. It should look something like {user.favorites.somethinghere ? FaRegHeart : FaHeart} */}
      {!liked ? <FaRegHeart /> : <FaHeart className="liked" />}
    </i>
  )
}

export default Like
