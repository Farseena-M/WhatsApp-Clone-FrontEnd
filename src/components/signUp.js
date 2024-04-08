import React, { useContext, useRef } from 'react'
import { Box, AppBar, Toolbar, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Axios, userContext } from '../App'
import { toast } from 'react-toastify'

const Component = styled(Box)`
height:100vh;
background-color:#DCDCDC;

`
const Header = styled(AppBar)`
height:220px;
background-color:#00bfa5;
box-shadow:none;
`


const SignUp = () => {
  const { user, setUser, setError } = useContext(userContext)
  const Nvgt = useNavigate()
  const refName = useRef()
  const refUserName = useRef()
  const refEmail = useRef()
  const refPassword = useRef()
  const refPhone = useRef()

  const handleClick = async (e) => {
    e.preventDefault();

    const newRefName = refName.current.value;
    const newRefUserName = refUserName.current.value;
    const newRefEmail = refEmail.current.value;
    const newRefPassword = refPassword.current.value;
    const newPhone = refPhone.current.value;

    // Validate email
    function validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    if (
      newRefName.length === 0 ||
      newRefUserName.length === 0 ||
      newRefEmail.length === 0 ||
      newRefPassword.length === 0 ||
      newPhone.length === 0
    ) {
      setError(true);
      toast.warning(`Please fill in all the fields.`);
      return; // stop further execution
    }

    if (!validateEmail(newRefEmail)) {
      setError(true);
      toast.warning(`Please enter a valid email address.`);
      return; // stop further execution
    }

    const value = {
      name: newRefName,
      username: newRefUserName,
      email: newRefEmail,
      password: newRefPassword,
      phone: newPhone
    };

    setUser([...user, value]);
    // console.log(value);

    try {
      const data = {
        name: newRefName,
        username: newRefUserName,
        password: newRefPassword,
        email: newRefEmail,
        phone: newPhone
      };

      const response = await Axios.post('http://localhost:4000/users/auth/signup', data);
      console.log(response);
      toast.success(`Successfully Registered`);
      Nvgt('/signin');
    } catch (err) {
      toast.error(err.message || 'An error occurred while registering.');
    }
  };

  return (
    <Component>
      <Header>
        <Toolbar>
          <div class="container-fluid" style={{ position: 'relative', top: '200px', }}>
            <form class="mx-auto" >
              <h4 class="text-center" style={{ color: 'black', fontFamily: 'inherit' }}>SignUp</h4>
              <div class="mb-2 mt-3">
                <label for="exampleInputname" class="form-label" style={{ color: 'black' }}>Name</label>
                <input type="name" class="form-control" id="exampleInputname" aria-describedby="emailHelp" placeholder='Enter your name..' ref={refName} />
              </div>
              <div class="mb-2 mt-2">
                <label for="exampleInputUsername" class="form-label" style={{ color: 'black' }}>User Name</label>
                <input type="username" class="form-control" id="exampleInputUsername" aria-describedby="emailHelp" placeholder='Enter your username..' ref={refUserName} />
              </div>
              <div class="mb-2 mt-2">
                <label for="exampleInputEmail" class="form-label" style={{ color: 'black' }}>Email</label>
                <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder='Enter your email..' ref={refEmail} />
              </div>
              <div class="mb-2">
                <label for="exampleInputPassword1" class="form-label" style={{ color: 'black' }}>Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder='Enter your password..' ref={refPassword} />
                {/* <div id="emailHelp" class="form-text mt-" style={{cursor:'pointer'}}>Forget password ?</div> */}
              </div>
              <div class="mb-2">
                <label for="exampleInputPhone" class="form-label" style={{ color: 'black' }}>Phone Number</label>
                <input type="number" class="form-control" id="exampleInputPhone" placeholder='Enter your phone number..' ref={refPhone} />
              </div>
              <button type="submit" class="btn btn-primary mt-2" style={{ border: 'none' }} onClick={handleClick}>Register</button>
            </form>
          </div>
        </Toolbar>
      </Header>
    </Component>

  )
}

export default SignUp