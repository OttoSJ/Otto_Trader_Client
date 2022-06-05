import CarCard from './CarCard'

function FavoriteCars({ favoriteCars }) {
  const sellerFavorites = favoriteCars
    ? favoriteCars.map((favorites) => favorites._id)
    : null

  return (
    <>
      <h2 className="container-centered mt-5">Favorites</h2>
      <div className="main-display-container">
        {favoriteCars
          ? favoriteCars.map((filteredCars) => (
              <CarCard
                key={filteredCars._id}
                filteredCars={filteredCars}
                sellerFavorites={sellerFavorites}
                // handleLiked={handleLiked}
              />
            ))
          : null}
      </div>
    </>
  )
}

export default FavoriteCars
