import React,{useState,useContext} from 'react'
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Link, useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { login } from '../../Redux/Features/LoginSlice';
import Alert from 'react-bootstrap/Alert';

function Login() {
//   const {Adminlogin,setOpen,open,error}=useContext(AuthContext)

  // for storing values 
    const [email,seetEmail]=useState('')
    const [password,setPassword]=useState('')

    const [logindata ,setlogindata] = useState({
    email:'',
    password:''
})

    const navigate = useNavigate()
    const dispatch = useDispatch()


    // for validation purpose       
    const [emailErr, setEmailErr] = useState({})
    const [passwordErr, setPasswordErr] = useState({})

  const formValidation=()=>{ 
      const emailErr={}
      const passwordErr={}

    let isValid = true

    // for email
    if (!email){
      emailErr.short_fname = '* email  is a required field'
      isValid = false
    }
    else{
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if ( !re.test(email) ) {    
        emailErr.short_fname = '* it must be valid email '
      isValid = false
      }
    }

    // for password
    if (!password){
      passwordErr.short_fname = '* password is a required field'
      isValid = false
    }


    setEmailErr(emailErr)
    setPasswordErr(passwordErr)

    return isValid
    }

    // api calling via authcontext

const handler=(e)=>{
  e.preventDefault()
  const isValid = formValidation()
  if (isValid){ 
    
    const data={
        email:email,
        password:password
    }
    
    dispatch(login(data))
  }
}


const {user,error} = useSelector((state)=>state.auth)



if(user){
  
  if (user.is_admin){
    navigate('/admin')
  }  else{
    navigate('/home')
  }
 
}



  return (
    <div>
        <Grid>
       
        <Paper elevation={5} className='papers p-5'>
         
          <Grid align='center' className='grid'>
          <Avatar >
            {/* <LockPersonOutlinedIcon/> */}
          </Avatar >
              <Typography variant='h4' className='typo'>LOGIN</Typography>
          </Grid>
          <Grid >
            <form onSubmit={handler} className='formss' >  
          
            <div>
            <TextField style={{marginTop:'50px'}}       InputLabelProps={{
                                                                            style: { color: 'black' ,fontWeight:600}, 
                                                                        }}
            variant='standard' name="email" type='text' label='Email' onChange={(e)=>seetEmail(e.target.value)} value={email}  placeholder='Enter Email' fullWidth></TextField>  
             {Object.keys(emailErr).map((key)=>{
                                 return <div style={{color:'red'}} >{emailErr[key]}</div> })}
            </div>      
            <div><TextField  name="password" style={{marginTop:'50px'}} InputLabelProps={{
                                                                            style: { color: 'black' ,fontWeight:600}, 
                                                                        }}
            variant='standard' type='password' label='Password' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} value={password}  fullWidth></TextField>
             {Object.keys(passwordErr).map((key)=>{
                                 return <div style={{color:'red'}} >{passwordErr[key]}</div> })}
          
            </div>
          {/* <CommonSnackbar  transition={TransitionLeft}  onClose={handleClose} message={error} open={open} />     */}
            <Button style={{marginTop:'20px',height:'50px'}} type='submit' fullWidth={true} className='button1' variant='contained'>Login</Button><br /><br />           
            </form> 
         {  error && <Alert variant="danger">{error}</Alert> }
            <Link to='/register' > <Button style={{marginTop:'20px',height:'50px'}} fullWidth={true} className='button1' variant='contained'>Register</Button></Link>
          </Grid> 
        </Paper>
      </Grid>
        
    </div>
  )
}

export default Login