import CarCard from './CarCard'

function FavoriteCars({ favoriteCars }) {
  return (
    <>
      <div className="container-centered mt-5">Hello</div>
      <div className="container-centered">
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
