import React, { useContext, useState,useEffect } from 'react'
import styles from './registerAndLogin.module.css'
import { AuthenticationContext } from '../../authentication/AuthenticationContext'
import classNames from 'classnames'

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, TextField } from '@mui/material';

import {Link} from 'react-router-dom'

function Login() {

    let { Login,emailerror,passworderror,ClearErrors,user } = useContext(AuthenticationContext)
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [showpassword, setShowPassword] = useState(false)
    console.log(user)
    useEffect(()=>{
        ClearErrors()
      },[])
    

    const handleClickShowPassword = () => {
        setShowPassword(!showpassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    console.log(email)

    return (
        <div className={styles.container}>
            <div className={styles.form_container}>
                <h1 className={styles.title}>LOGIN PAGE</h1>
                {/* Email  */}
                <TextField sx={{ m: 1, width: '100%' }} id="outlined-basic" label="Email" variant="outlined"
                onChange={(e)=>setEmail(e.target.value)} />
                <small className={styles.errormsg}>{emailerror}</small>
                {/* Password  */}
                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showpassword ? 'text' : 'password'}
                        value={password}
                        required="true"
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showpassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <small className={styles.errormsg}>{passworderror}</small>
                <button className={classNames(styles.btn,styles.registerbtn)}
                onClick={()=>Login(email,password)}
                >Login</button>

                <div className={styles.already_user_container}>
                        <p>New User ? <Link to={{pathname:'/Register'}} className={styles.link}>Register</Link></p>
                </div>
                {/* <button className={classNames(styles.btn,styles.loginbtn)}>Login</button> */}
            </div>
        </div>
    )
}

export default Login