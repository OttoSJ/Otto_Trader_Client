import React from 'react'
import { upperCase, numberWithCommas } from '../../utilities.js/functions'

function CarForm({ onChange, carDetails }) {
  let {
    _id,
    make,
    year,
    model,
    type,
    listprice,
    color,
    drivetype,
    engine,
    transmission,
    discription,
    image,
    mileage,
    ac,
    leatherseats,
    sunroof,
    bluetooth,
    comments,
    cruisecontrol,
    satradio,
    auxport,
    amfm,
    listVehicle,
  } = carDetails

  return (
    <>
      <div className="col-6">
        <label htmlFor="make" className="form-label">
          Make <span className="required">*</span>
        </label>
        <input
          defaultValue={carDetails ? upperCase(make) : null}
          autoFocus
          type="text"
          className="form-control"
          name="make"
          id="make"
          placeholder="Make"
          onChange={onChange}
        />
      </div>
      <div className="col-6">
        <label htmlFor="model" className="form-label">
          Model <span className="required">*</span>
        </label>
        <input
          defaultValue={carDetails ? upperCase(model) : null}
          type="text"
          className="form-control"
          name="model"
          id="model"
          placeholder="Model"
          onChange={onChange}
        />
      </div>

      <div className="col-6">
        <label htmlFor="year" className="form-label">
          Year <span className="required">*</span>
        </label>
        <input
          defaultValue={carDetails ? year : null}
          type="number"
          className="form-control"
          name="year"
          id="year"
          onChange={onChange}
        />
      </div>
      <div className="col-6">
        <label htmlFor="type" className="form-label">
          Body Type <span className="required">*</span>
        </label>
        <input
          defaultValue={carDetails ? upperCase(type) : null}
          type="text"
          className="form-control"
          name="type"
          id="type"
          onChange={onChange}
        />
      </div>
      <div className="col-6">
        <label htmlFor="listprice" className="form-label">
          Listprice <span className="required">*</span>
        </label>
        <input
          defaultValue={carDetails ? `${numberWithCommas(listprice)}` : null}
          type="text"
          className="form-control"
          name="listprice"
          id="listprice"
          onChange={onChange}
        />
      </div>
      <div className="col-6">
        <label htmlFor="color" className="form-label">
          Color <span className="required">*</span>
        </label>
        <input
          defaultValue={carDetails ? upperCase(color) : null}
          type="text"
          className="form-control"
          name="color"
          id="color"
          onChange={onChange}
        />
      </div>
      <div className="col-6">
        <label htmlFor="drivetype" className="form-label">
          Drive Type <span className="required">*</span>
        </label>
        <input
          defaultValue={carDetails ? upperCase(drivetype) : null}
          type="text"
          className="form-control"
          name="drivetype"
          id="drivetype"
          placeholder=""
          onChange={onChange}
        />
      </div>

      <div className="col-6">
        <label htmlFor="engine" className="form-label">
          Engine <span className="required">*</span>
        </label>
        <input
          defaultValue={engine ? upperCase(engine) : null}
          type="text"
          className="form-control"
          name="engine"
          id="engine"
          onChange={onChange}
        />
      </div>

      <div className="col-6">
        <label htmlFor="transmission" className="form-label">
          Transmission <span className="required">*</span>
        </label>
        <input
          defaultValue={carDetails ? upperCase(transmission) : null}
          type="text"
          className="form-control"
          name="transmission"
          id="transmission"
          onChange={onChange}
        />
      </div>

      <div className="col-6">
        <label htmlFor="mileage" className="form-label">
          Mileage <span className="required">*</span>
        </label>
        <input
          defaultValue={carDetails ? numberWithCommas(mileage) : null}
          type="text"
          className="form-control"
          name="mileage"
          id="mileage"
          onChange={onChange}
        />
      </div>

      <div className="col-12">
        <label htmlFor="image" className="form-label ">
          Image
        </label>
        <input
          defaultValue={carDetails ? image : null}
          type="text"
          className="form-control"
          name="image"
          id="image"
          onChange={onChange}
        />
      </div>

      <div className="col-7">
        <label htmlFor="comments" className="form-label">
          Comments
        </label>
        <input
          defaultValue={carDetails ? comments : null}
          type="text"
          className="form-control"
          name="comments"
          id="comments"
          onChange={onChange}
        />
      </div>
      <div className="col-5">
        <label htmlFor="listVehicle" className="form-label">
          List Vehicle
        </label>
        <select
          id="listVehicle"
          name="listVehicle"
          className="form-select select-box-size"
          onChange={onChange}
          defaultValue={listVehicle}
        >
          <option value="Choose"> {listVehicle ? 'Yes' : 'No'} </option>
          <option value={true}>Yes </option>
          <option value={false}>No </option>
        </select>
      </div>

      <div className="headings">
        <h2> Additional Options</h2>
      </div>
      <div className="container">
        <div className="options-container">
          <div className="col-md-2">
            <label htmlFor="ac" className="form-label">
              A/C
            </label>
            <select
              id="ac"
              name="ac"
              className="form-select select-box-size"
              onChange={onChange}
              defaultValue={ac}
            >
              <option value="Choose"> {ac ? 'Yes' : 'No'} </option>
              <option value="true">Yes </option>
              <option value="false">No </option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="leatherseats" className="form-label">
              Leather
            </label>
            <select
              id="leatherseats"
              name="leatherseats"
              className="form-select select-box-size"
              onChange={onChange}
            >
              <option value="Choose"> {leatherseats ? 'Yes' : 'No'} </option>

              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="sunroof" className="form-label">
              Sun Roof
            </label>
            <select
              id="sunroof"
              name="sunroof"
              className="form-select select-box-size"
              onChange={onChange}
            >
              <option value="Choose"> {sunroof ? 'Yes' : 'No'} </option>

              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="bluetooth" className="form-label">
              Bluetooth
            </label>
            <select
              id="bluetooth"
              name="bluetooth"
              className="form-select select-box-size"
              onChange={onChange}
            >
              <option value="Choose"> {bluetooth ? 'Yes' : 'No'} </option>

              <option value="true">Yes </option>
              <option value="false">No </option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="cruisecontrol" className="form-label">
              Cruise Control
            </label>
            <select
              id="cruisecontrol"
              name="cruisecontrol"
              className="form-select select-box-size"
              onChange={onChange}
            >
              <option value="Choose"> {cruisecontrol ? 'Yes' : 'No'} </option>

              <option value="true">Yes </option>
              <option value="false">No </option>
            </select>
          </div>
          <div className="col-md-2 ">
            <label htmlFor="satradio" className="form-label">
              Sat Radio
            </label>
            <select
              id="satradio"
              name="satradio"
              className="form-select select-box-size"
              onChange={onChange}
            >
              <option value="Choose"> {satradio ? 'Yes' : 'No'} </option>

              <option value="true">Yes </option>
              <option value="false">No </option>
            </select>
          </div>
          <div className="col-md-2 ">
            <label htmlFor="auxport" className="form-label">
              Aux Port
            </label>
            <select
              id="auxport"
              name="auxport"
              className="form-select select-box-size"
              onChange={onChange}
            >
              <option value="Choose"> {auxport ? 'Yes' : 'No'} </option>

              <option value="true">Yes </option>
              <option value="false">No </option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="amfm" className="form-label">
              Am/Fm
            </label>
            <select
              id="amfm"
              name="amfm"
              className="form-select select-box-size"
              onChange={onChange}
            >
              <option value="Choose"> {amfm ? 'Yes' : 'No'} </option>
              <option value="true">Yes </option>
              <option value="false">No </option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default CarForm
