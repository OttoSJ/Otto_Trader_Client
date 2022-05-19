import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import UserForm from '../components/sub_components/UserForm'
import { FaUser } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import ModalComponent from './sub_components/Modal'
import {
  confirmEditUserMessage,
  confirmHeaderMessage,
  confirmDeleteUserMessage,
  warningHeaderMessage,
  confirmedDeleteMessage,
  confirmedEditMessage,
} from '../utilities.js/variables'

function EditUserDetails() {
  const [userInformation, setUserInformation] = useState('')
  const [formData, setFormData] = useState({})
  const [modalBodyMessage, setModalBodyMessage] = useState('')
  const [modalHeaderMessage, setModalHeaderMessage] = useState('')
  const [modalMessageConfirmed, setModalMessageConfirmed] = useState(false)
  const [cancel, setCancel] = useState(false)
  const [show, setShow] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const API_URL_UPDATE_USER_INFO = `https://otto-trader-api.herokuapp.com/api/users/update-user-info/${params.userId}`
  const API_URL_DELETE_USER_INFO = `https://otto-trader-api.herokuapp.com/api/users/delete-user/${params.userId}`
  const API_URL_GET_USER_INFO = `https://otto-trader-api.herokuapp.com/api/users/user-info/${params.userId}`
  const API_URL_DELETE_USER_INVENTORY_INFO = `https://otto-trader-api.herokuapp.com/api/users/delete-users-inventory/${params.userId}`

  const userInfo = JSON.parse(localStorage.getItem('user'))
  const token = userInfo.token

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const requestDeleteUserOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const requestDeleteInventoryOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const requestUpdateOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  }

  const onSubmit = () => {
    const fetchData = async () => {
      const response = await fetch(
        API_URL_UPDATE_USER_INFO,
        requestUpdateOptions
      )
    }

    setModalMessageConfirmed(true)
    setModalBodyMessage(confirmedEditMessage)
    fetchData()
    setTimeout(() => {
      navigate('/sellerdashboard')
    }, 2500)
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleDelete = () => {
    const fetchData = async () => {
      const resDeleteInventory = await fetch(
        API_URL_DELETE_USER_INVENTORY_INFO,
        requestDeleteInventoryOptions
      )
      const resDeleteUser = await fetch(
        API_URL_DELETE_USER_INFO,
        requestDeleteUserOptions
      )
    }

    setModalMessageConfirmed(true)
    setModalBodyMessage(confirmedDeleteMessage)
    fetchData()
    setTimeout(() => {
      dispatch(reset(navigate('/')))
      dispatch(logout())
    }, 2500)
  }

  const handleOnSubmit = () => {
    setModalMessageConfirmed(false)
    setShow(true)
    setCancel(false)
    setModalBodyMessage(confirmEditUserMessage)
    setModalHeaderMessage(confirmHeaderMessage)
  }

  const handleCancel = () => {
    setShow(true)
    setCancel(true)
    setModalBodyMessage(confirmDeleteUserMessage)
    setModalHeaderMessage(warningHeaderMessage)
  }

  const handleClose = () => setShow(false)

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
    const fetchData = async () => {
      const response = await fetch(API_URL_GET_USER_INFO, requestOptions)
      const resData = await response.json()
      setUserInformation(resData)
      setFormData(resData)
    }
    fetchData()
    setCancel(false)
  }, [API_URL_GET_USER_INFO, navigate, setCancel])

  return (
    <>
      <h1 className="mt-5 headings">
        <FaUser className="mb-3 mx-2" /> Hello, {userInformation.firstname}{' '}
        {userInformation.lastname}
        <p className="p-5">Edit Your Information Below</p>
      </h1>
      <ModalComponent
        handleClose={handleClose}
        handleDelete={handleDelete}
        onSubmit={onSubmit}
        show={show}
        cancel={cancel}
        modalBodyMessage={modalBodyMessage}
        modalHeaderMessage={modalHeaderMessage}
        modalMessageConfirmed={modalMessageConfirmed}
      />

      <Form onSubmit={onSubmit} className="container">
        <UserForm onChange={onChange} userInformation={userInformation} />
        <Button
          onClick={handleCancel}
          className="btn btn-danger col-5 mt-5 m-3  mb-5"
        >
          Delete
        </Button>
        <Button
          onClick={handleOnSubmit}
          className="btn btn-dark col-5 mt-5 m-3 mb-5"
        >
          Submit
        </Button>
      </Form>
    </>
  )
}

export default EditUserDetails
