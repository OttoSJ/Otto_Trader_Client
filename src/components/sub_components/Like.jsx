import { useState } from 'react'
import { FaRegHeart, FaHeart } from 'react-icons/fa'

function Like() {
  const [liked, setLiked] = useState(true)

  const onClick = () => {
    if (liked) {
      setLiked(false)
    } else setLiked(true)
  }

  return (
    <i onClick={onClick} className="cursor">
      {' '}
      {!liked ? <FaRegHeart /> : <FaHeart className="liked" />}
    </i>
  )
}

export default Like
