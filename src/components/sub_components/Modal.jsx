import { Button, Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getUserInventory,
  reqOptionsTokenOnly,
} from '../../utilities.js/functions'

function ModalComponent({
  HTTP,
  handleClose,
  onSubmit,
  show,
  cancel,
  handleDelete,
  modalBodyMessage,
  modalHeaderMessage,
  modalMessageConfirmed,
}) {
  const [sellersName, setSellersName] = useState('')
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const token = userInfo.token

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        getUserInventory(HTTP, userInfo._id),
        reqOptionsTokenOnly(token, 'GET')
      )

      const resData = await response.json()

      setSellersName({ prefix: resData.prefix })
    }
    fetchData()
    if (!token) {
      navigate('/login')
    }
  }, [getUserInventory, reqOptionsTokenOnly, navigate])

  return (
    <>
      <Modal className="px-2" show={show} onHide={handleClose}>
        {!modalMessageConfirmed ? (
          <>
            {' '}
            <Modal.Header closeButton>
              <Modal.Title>{modalHeaderMessage}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalBodyMessage}</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                className="px-4 m-1"
                onClick={handleClose}
              >
                {sellersName.prefix ? 'No' : 'Later'}
              </Button>
              {!cancel ? (
                <Button
                  variant="primary"
                  onClick={onSubmit}
                  className="btn btn-dark col-8  m-1"
                >
                  {sellersName.prefix
                    ? 'Yes, Please Submit'
                    : 'Update Profile Now'}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleDelete}
                  className="btn btn-dark col-8  m-1"
                >
                  Yes, Please Delete
                </Button>
              )}
            </Modal.Footer>
          </>
        ) : (
          <Modal.Body>{modalBodyMessage}</Modal.Body>
        )}
      </Modal>
    </>
  )
}

export default ModalComponent
