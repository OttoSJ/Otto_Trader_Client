import { useState, useEffect } from 'react'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import {
  getUserInventory,
  reqOptionsTokenOnly,
  addToFavorites,
  reqOptionsAddFav,
  removeFromFav,
  reqOptionsDeleteFav,
  URL,
} from '../../utilities.js/functions'

function Like({ filteredCars, carId, sellerDashboard }) {
  const [sellerFavorites, setSellerFavorites] = useState('')
  const [HTTP] = useState(URL)
  const [liked, setLiked] = useState(false)
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const token = userInfo ? userInfo.token : null

  useEffect(() => {
    if (userInfo) {
      const fetchData = async () => {
        const response = await fetch(
          getUserInventory(HTTP, userInfo._id),
          reqOptionsTokenOnly(token)
        )
        const resData = await response.json()

        const favIds = resData.favorites.map((favorites) => favorites._id)

        setSellerFavorites(favIds)
      }
      fetchData()
    } else return null
  }, [liked, setSellerFavorites])

  const handleLiked = (e, car) => {
    e.preventDefault()

    const fetchLikeData = async () => {
      const response = await fetch(
        addToFavorites(HTTP, userInfo._id),
        reqOptionsAddFav(token, car._id)
      )
      const resData = await response.json()
      setSellerFavorites(resData.favorites)
    }

    const fetchUnlikeData = async () => {
      const response = await fetch(
        removeFromFav(HTTP, userInfo._id),
        reqOptionsDeleteFav(token, car._id, userInfo._id)
      )
      const resData = await response.json()

      setSellerFavorites(resData.favorites)
    }

    const checkId = (favoritesCars) => favoritesCars === car._id

    if (!sellerFavorites.some(checkId) || sellerFavorites === []) {
      setTimeout(() => {
        setLiked((currentLike) => (currentLike = true))
      }, 1000)
      fetchLikeData()
    } else {
      setTimeout(() => {
        setLiked((currentLike) => (currentLike = false))
      }, 1000)
      fetchUnlikeData()
    }
  }

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
