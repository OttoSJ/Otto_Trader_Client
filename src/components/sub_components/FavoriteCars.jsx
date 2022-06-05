import CarCard from './CarCard'

function FavoriteCars({ favoriteCars }) {
  return (
    <>
      <h2 className="container-centered mt-5">Favorites</h2>
      <div className="main-display-container">
        {favoriteCars
          ? favoriteCars.map((filteredCars) => (
              <CarCard key={filteredCars._id} filteredCars={filteredCars} />
            ))
          : null}
      </div>
    </>
  )
}

export default FavoriteCars