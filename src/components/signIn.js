import React, { useContext, useRef } from 'react'
import { Box, AppBar, Toolbar, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './signIn.css'
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
const SignIn = () => {
    const Nvgt = useNavigate()
    const { setError } = useContext(userContext)
    const reffEmail = useRef()
    const reffPassword = useRef()

    const hndlClick = async (e) => {
        e.preventDefault();

        const newLreffEmail = reffEmail.current.value;
        const newLreffPassword = reffPassword.current.value;

        if (newLreffEmail.length === 0 || newLreffPassword.length === 0) {
            setError(true);
            toast.warning(`Please fill in the blank`);
            return; // stop further execution
        }

        try {
            const data = {
                'email': newLreffEmail,
                'password': newLreffPassword
            };

            const rspns = await Axios.post('http://localhost:4000/users/auth/login', data);
            console.log(rspns);
            const userToken = rspns.data.token
            localStorage.setItem('userToken', userToken)
            toast.success("User login Successfully");
            Nvgt('/chat');
        } catch (err) {
            console.error(err);
            toast.error(err.message || 'An error occurred while logging in.');
        }
    };

    return (
        <Component>
            <Header>
                <Toolbar>
                    <div class="container-fluid" style={{ position: 'relative', top: '200px', }}>
                        <form class="mx-auto">
                            <h4 class="text-center" style={{ color: 'black' }}>Login</h4>
                            <div class="mb-3 mt-5">
                                <label for="exampleInputEmail" class="form-label" style={{ color: 'black' }}>Email</label>
                                <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder='Enter your email..' ref={reffEmail} />
                            </div>

                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label" style={{ color: 'black' }}>Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder='Enter your password..' ref={reffPassword} />
                            </div>
                            <button type="submit" class="btn btn-primary mt-2" style={{ border: 'none' }} onClick={hndlClick}>Login</button>
                            <button type="submit" class="btn btn-primary mt-2" style={{ border: 'none' }} onClick={() => Nvgt('/signup')}>SignUp</button>
                        </form>
                    </div>
                </Toolbar>
            </Header>
        </Component>
    )
}

export default SignIn