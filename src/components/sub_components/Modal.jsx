import { Button, Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

  const API_URL_GET_USERS_INVENTORY = `${HTTP}/api/users/inventory/${userInfo._id}`

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL_GET_USERS_INVENTORY, requestOptions)

      const resData = await response.json()

      setSellersName({ prefix: resData.prefix })
      console.log(sellersName)
    }
    fetchData()
    if (!token) {
      navigate('/login')
    }
  }, [API_URL_GET_USERS_INVENTORY, navigate])

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
                  className="btn btn-dark col-8  m-3"
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
