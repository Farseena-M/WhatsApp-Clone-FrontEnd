import React from 'react'
import {Box,AppBar,Toolbar,styled} from '@mui/material'
import { useNavigate } from 'react-router-dom'


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
const Nvgt = useNavigate()
  return (
    <Component>
        <Header>
            <Toolbar>
            <div class="container-fluid" style={{position:'relative',top:'200px',}}>
            <form class="mx-auto">
                <h4 class="text-center"  style={{color:'black',fontFamily:'inherit'}}>SignUp</h4>
                <div class="mb-3 mt-5">
                  <label for="exampleInputUsername" class="form-label" style={{color:'black'}}>User Name</label>
                  <input type="username" class="form-control" id="exampleInputUsername" aria-describedby="emailHelp" placeholder='Enter your username..'/>
                </div>          
                <div class="mb-3 mt-2">
                  <label for="exampleInputEmail" class="form-label" style={{color:'black'}}>Email</label>
                  <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder='Enter your email..'/>
                </div>          
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label" style={{color:'black'}}>Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder='Enter your password..'/>
                  {/* <div id="emailHelp" class="form-text mt-" style={{cursor:'pointer'}}>Forget password ?</div> */}
                </div>
                <button type="submit" class="btn btn-primary mt-2" style={{border:'none'}} onClick={()=>Nvgt('/signin')}>Register</button>
              </form>
              </div>
            </Toolbar>
        </Header>
        </Component>
        
  )
}

export default SignUp