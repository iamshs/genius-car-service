import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const Login = () => {

  const emailRef = useRef('')
  const passwordRef = useRef('')
  const navigate = useNavigate()
  const location = useLocation()
  const [
    signInWithEmailAndPassword,
    user,
    
    
  ] = useSignInWithEmailAndPassword(auth);

  let from = location.state?.from?.pathname || "/";
  const handleSubmit = event => {
    event.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value;
    signInWithEmailAndPassword(email,password)
  }
  if (user) {
    navigate(from, { replace: true });
}
  const handleNavigate = () => {
    navigate('/register')
  }

  return (
    <div className='w-50 mx-auto'>
      <h1 className='text-primary text-center my-3'>Please Login Here</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={passwordRef} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <p>Do not Have an account? <Link className='text-danger text-decoration-none' to='/register' onClick={handleNavigate}>Please Register</Link> </p>
    </div>
  );
};

export default Login;