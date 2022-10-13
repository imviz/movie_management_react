import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Link ,useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import './Register.css'
import axios from '../../Axios';
import {useSelector} from 'react-redux'

function EditProfile() {
    
  const navigate=useNavigate()
  // for storing values
    const [name,setName]=useState('')   
    const [email,seetEmail]=useState('')
    useEffect(() => {
    getProfileData()
    }, [])
    

    const {user}=useSelector((state)=>state.auth)

    const getProfileData=()=>{    
        axios.get(`user/update/${user.id}/`,{
            headers: {
            Authorization:'Bearer  '+user.access
        
        }}).then((res)=>{
            console.log(res.data,'data')
            setName(res.data.name)
            seetEmail(res.data.email)
        })
        }

// register calling
    const handler=(e)=>{
      e.preventDefault() 
     
        axios.patch(`user/update/${user.id}/`,{
              name:name,            
              email:email,          
             
          },{
            headers: {
                Authorization:'Bearer  '+user.access
            
            }

          }).then((res)=>{
              console.log(res.data,'data')
              navigate('/home')
            
          })
    
    }

    
  return (
    <div>
      <Grid>
        <Paper elevation={5} className='paper'>
         
          <Grid align='center' className='grid'>
          <Avatar >          
          </Avatar >
              <Typography variant='h4' className='typo'>Edit Profile Here</Typography>
          </Grid>
          <Grid >
            <form onSubmit={handler} className='formss' >   
            <div><TextField style={{marginTop:'55px'}}   InputLabelProps={{
                                                                            style: { color: 'black' ,fontWeight:600,}, 
                                                                        }}        
            variant='standard' name="name"  type='text' label='name' placeholder='Enter name' onChange={(e)=>setName(e.target.value)} value={name} fullWidth></TextField>
                    
            </div>       
            <div>
            <TextField style={{marginTop:'40px'}}       InputLabelProps={{
                                                                            style: { color: 'black' ,fontWeight:600}, 
                                                                        }}
            variant='standard' name="email" type='text' label='Email' onChange={(e)=>seetEmail(e.target.value)} value={email}  placeholder='Enter Email' fullWidth></TextField>  
          
            </div>      
          
           
            <Button style={{marginTop:'40px'}} type='submit' fullWidth={true} className='button1' variant='outlined'>Change it</Button><br /><br />
            </form> 
          </Grid> 
        </Paper>
      </Grid>
    </div>
  )
}

export default EditProfile