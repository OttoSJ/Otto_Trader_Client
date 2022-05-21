import { Button, Modal } from 'react-bootstrap'

function ModalComponent({
  handleClose,
  onSubmit,
  show,
  cancel,
  sellersName,
  handleDelete,
  modalBodyMessage,
  modalHeaderMessage,
  modalMessageConfirmed,
}) {
  // console.log(sellersName)
  return (
    <>
      <Modal show={show} onHide={handleClose}>
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
                className="px-4"
                onClick={handleClose}
              >
                {!sellersName[0] ? 'No' : 'Later'}
              </Button>
              {!cancel ? (
                <Button
                  variant="primary"
                  onClick={onSubmit}
                  className="btn btn-dark col-8  m-3"
                >
                  {!sellersName[0]
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
