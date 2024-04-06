import React from 'react'
import {Box,AppBar,Toolbar,styled,Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './signIn.css'


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
  return (
    <Component>
        <Header>
            <Toolbar>
            <div class="container-fluid" style={{position:'relative',top:'200px',}}>
            <form class="mx-auto">
                <h4 class="text-center"  style={{color:'black'}}>Login</h4>
                <div class="mb-3 mt-5">
                  <label for="exampleInputUsername" class="form-label" style={{color:'black'}}>User Name</label>
                  <input type="username" class="form-control" id="exampleInputUsername" aria-describedby="emailHelp" placeholder='Enter your username..'/>
                </div>
                
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label" style={{color:'black'}}>Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder='Enter your password..'/>
                </div>
                <button type="submit" class="btn btn-primary mt-2" style={{border:'none'}} onClick={()=>Nvgt('/chat')}>Login</button>
                <button type="submit" class="btn btn-primary mt-2" style={{border:'none'}} onClick={()=>Nvgt('/signup')}>SignUp</button>
              </form>
              </div>
            </Toolbar>
        </Header>
        </Component>
  )
}

export default SignIn