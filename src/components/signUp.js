import React, { useContext, useRef, useState } from 'react'
import { Box, AppBar, Toolbar, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Axios, userContext } from '../App'
import { toast } from 'react-toastify'
import { useAuthContext } from '../AccountContext/accountContext'

const Component = styled(Box)`
height:100vh;
background-color:#DCDCDC;
`;
const Header = styled(AppBar)`
height:220px;
background-color:#00bfa5;
box-shadow:none;
`;


const SignUp = () => {
  const { user, setUser, setError } = useContext(userContext)
  const { setAuthUser } = useAuthContext()
  const Nvgt = useNavigate()
  const refName = useRef()
  const refEmail = useRef()
  const refPassword = useRef()
  const refPhone = useRef()
  const [image, setImage] = useState('')



  const handleFileChange = (file) => {
    setImage(file);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const newRefName = refName.current.value;
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
      newRefEmail.length === 0 ||
      newRefPassword.length === 0 ||
      newPhone.length === 0
    ) {
      setError(true);
      toast.warning(`Please fill in all the fields.`);
      return;
    }

    if (!validateEmail(newRefEmail)) {
      setError(true);
      toast.warning(`Please enter a valid email address.`);
      return;
    }

    const value = {
      name: newRefName,
      email: newRefEmail,
      password: newRefPassword,
      phone: newPhone
    };

    setUser([...user, value]);
    // console.log(value);

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', newRefName);
      formData.append('email', newRefEmail);
      formData.append('password', newRefPassword);
      formData.append('phone', newPhone);

      const res = await Axios.post('http://localhost:4000/users/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }

      });
      const data = res.data
      // console.log(data);
      localStorage.setItem('chat-user', JSON.stringify(data))
      setAuthUser(data)
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
          <div className="container-fluid" style={{ position: 'relative', top: '200px', }}>
            <form className="mx-auto" >
              <h4 className="text-center" style={{ color: 'black', fontFamily: 'inherit' }}>SignUp</h4>
              <div className="mb-2 mt-3">
                <label htmlFor="exampleInputname" className="form-label" style={{ color: 'black' }}>Name</label>
                <input type="name" className="form-control" id="exampleInputname" aria-describedby="emailHelp" placeholder='Enter your name..' ref={refName} />
              </div>
              <div className="mb-2 mt-2">
                <label htmlFor="exampleInputEmail" className="form-label" style={{ color: 'black' }}>Email</label>
                <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder='Enter your email..' ref={refEmail} />
              </div>
              <div className="mb-2">
                <label htmlFor="exampleInputPassword1" className="form-label" style={{ color: 'black' }}>Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your password..' ref={refPassword} />
                {/* <div id="emailHelp" class="form-text mt-" style={{cursor:'pointer'}}>Forget password ?</div> */}
              </div>
              <div className="mb-2">
                <label htmlFor="exampleInputPhone" className="form-label" style={{ color: 'black' }}>Phone Number</label>
                <input type="number" className="form-control" id="exampleInputPhone" placeholder='Enter your phone number..' ref={refPhone} />
              </div>
              <div className="mb-2">
                <label htmlFor="exampleInputImage" className="form-label" style={{ color: 'black' }}>Profile</label>
                <input type="file" className="form-control" id="exampleInputImage" p={1.5} accept='image/*' onChange={(e) => handleFileChange(e.target.files[0])} />
              </div>
              <button type="submit" className="btn btn-primary mt-2" style={{ border: 'none' }} onClick={handleClick}>Register</button>
            </form>
          </div>
        </Toolbar>
      </Header>
    </Component>

  )
}

export default SignUp