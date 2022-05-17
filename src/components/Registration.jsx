import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { FaUser } from 'react-icons/fa'
import UserForm from '../components/sub_components/UserForm'
import { Form, Button } from 'react-bootstrap'

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  })

  const {
    username,
    password,
    password2,
    email,
    firstname,
    lastname,
    address,
    city,
    state,
    zip,
  } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/sellerdashboard')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        username,
        password,
        email,
        firstname,
        lastname,
        address,
        city,
        state,
        zip,
      }

      // console.log(userData)
      dispatch(register(userData))
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="container">
      <h1 className="mt-5 headings">
        <FaUser className="mb-3 mx-2" /> Register User
        <p className="p-5">Please Create Your Account!</p>
      </h1>
      <Form onSubmit={onSubmit}>
        <UserForm onChange={onChange} />
        <Button
          type="submit"
          className="btn btn-dark col-5 mt-5 mb-5 container"
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Registration
