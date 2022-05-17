import React from 'react'
import SpinnerReact from 'react-bootstrap/Spinner'

function Spinner() {
  return (
    <div className="container mt-5">
      {' '}
      <SpinnerReact animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </SpinnerReact>
    </div>
  )
}

export default Spinner
