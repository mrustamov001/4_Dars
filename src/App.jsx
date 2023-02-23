import axios from 'axios';
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { request } from './config/request';
import './App.css'

function App() {

  const [data, setData] = useState([])
  const [value, setValue] = useState({ name: "", lastName: "", email: "", })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    request.get('/users').then((response) => {
      console.log(response);
    })
    // axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
    //   setData(response.data)
    //   setLoading(false)
    // }).catch((error) => {
    //   setLoading(false)
    // });
  }, [])

  const handleInp = (e) => {
    setValue((n) => {
      return ({ ...n, [e.target.name]: e.target.value, id: Math.floor(Math.random() * 100) })
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setData((h) => [...h, { ...value, id: Math.floor(Math.random() * 100) }])
    setValue({ name: "", lastName: "", email: "", })
    console.log(value)
  }



  const handleDel = (id) => {
    setData((s) => s.filter((el) => el.id !== id))
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <div className="landing">
        <div className="container">
          <div className="d-flex flex-column justify-content-center align-content-center">
            <h1 className='display-1 text-center text-light fw-bold'>ToDo List</h1>
            <form className='form-control py-4 mb-5 px-4 w-75 bg-transparent mx-auto' onSubmit={handleSubmit}>
              <input className='form-control mb-3' onChange={handleInp} type="text" placeholder='Your Name' value={value.name} name="name" id="text" />
              <input className='form-control mb-3' onChange={handleInp} type="text" placeholder='Your LastName' value={value.lastName} name="lastName" id="lastname" />
              <input className='form-control mb-3' onChange={handleInp} type="email" placeholder='Your Email' value={value.email} name="email" id="email" />
              <button className="btn btn-primary w-100 mx-auto mt-3 d-block" type='submit'>Send</button>
            </form>
            <ul className={data.length ? "p-0 d-block" : "d-none"}>
            <li className='list-unstyled w-75 mx-auto px-4 text-light'>
                <div className="d-flex">
                  <p className='w_30'>ID</p>
                  <p className='w_200'>Name</p>
                  <p className='w_200'>LastName</p>
                  <p className='w_200'>Email</p>
                  <p className='edit'>Edit</p>
                  <p>Del</p>
                </div>
              </li>
            </ul>
            <ul className="p-0 d-block name__list">
              {data.map((item, index) => {
                return <li key={index} className="d-flex justify-content-between border w-75 align-items-center mx-auto px-4 list-unstyled text-light">
                  <div className="d-flex align-items-center pt-2">
                    <p className='w_30 fs-5'>{item.id}</p>
                    <p className='w_200 fs-5'>{item.name}</p>
                    <p className='w_200 fs-5'>{item.lastName}</p>
                    <p className='w_200 fs-5'>{item.email}</p>
                  </div>
                  <div className="d-flex gap-2">
                    <button className='bg-warning btn d-block' onClick={handleShow}><i className="fa-solid fa-pen-to-square"></i></button>
                    <button className='bg-danger btn d-block' onClick={() => handleDel(item.id)}><i className="fa-solid fa-trash"></i></button>
                  </div>
                </li>
              })}
            </ul>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Your_Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Your name"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>LastName_address</Form.Label>
                    <Form.Control
                      type="lastname"
                      placeholder="LastName"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email_address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="email@example.com"
                      autoFocus
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
