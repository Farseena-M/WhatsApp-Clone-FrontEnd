import React, { useContext, useRef} from 'react'
import { Box, AppBar, Toolbar, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './signIn.css'
import { Axios, userContext } from '../App'
import { toast } from 'react-toastify'
import { useAuthContext } from '../AccountContext/accountContext'


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
    const {setAuthUser} = useAuthContext()
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
            const Data = rspns.data.findUser
            localStorage.setItem('chat-user', JSON.stringify(Data))
            setAuthUser(Data)
            toast.success("User login Successfully");
            Nvgt('/profile');
        } catch (err) {
            console.error(err);
            toast.error(err.message || 'An error occurred while logging in.');
        }
    };

    return (
        <Component>
            <Header>
                <Toolbar>
                    <div className="container-fluid" style={{ position: 'relative', top: '200px', }}>
                        <form className="mx-auto">
                            <h4 className="text-center" style={{ color: 'black' }}>Login</h4>
                            <div className="mb-3 mt-5">
                                <label htmlFor="exampleInputEmail" className="form-label" style={{ color: 'black' }}>Email</label>
                                <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder='Enter your email..' ref={reffEmail} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label" style={{ color: 'black' }}>Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your password..' ref={reffPassword} />
                            </div>
                            <button type="submit" className="btn btn-primary mt-2" style={{ border: 'none' }} onClick={hndlClick}>Login</button>
                            <button type="submit" className="btn btn-primary mt-2" style={{ border: 'none' }} onClick={() => Nvgt('/signup')}>SignUp</button>
                        </form>
                    </div>
                </Toolbar>
            </Header>
        </Component>
    )
}

export default SignIn