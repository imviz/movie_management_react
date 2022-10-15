import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import {useSelector} from 'react-redux'
import axios from '../../Axios';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const imageUrl='http://127.0.0.1:8000/'
    // mounting component render
    useEffect(() => {
        getSelfPost()       

        }, [])
    
    const navigate=useNavigate()
    // storing data
    const [poster,setPoster]=useState([])


    // for changing the section
    const [firstView,setFirstView]=useState(true)

    const changeHandler=()=>{
        if (firstView){
            getOtherPost()
            setFirstView(false)
        }else{
            getSelfPost()
            setFirstView(true)
          
        }
    }

    const {user}=useSelector((state)=>state.auth)
    console.log(user,'lll')
    // get all records of book that can seen student on home page 
    const getSelfPost=()=>{    
        axios.get('user/self_post/',{
            headers: {
            Authorization:'Bearer  '+user.access
        
        }}).then((res)=>{
            console.log(res.data,'data')
            setPoster(res.data)
        })
        }


 const getOtherPost=()=>{    
        axios.get('user/other_post/',{
            headers: {
            Authorization:'Bearer  '+user.access
        
        }}).then((res)=>{
            console.log(res.data,'other')
            setPoster(res.data)
        })
        }


  return (
    <div>
        <div align='center'>
         {firstView ?   <h1 style={{color:'wheat'}}>Personal Post</h1> :<h1 style={{color:'wheat'}}>Other Post</h1> }

           {firstView ? <Button onClick={changeHandler} variant='contained'>visible Posts</Button> : <Button onClick={changeHandler} variant='contained'>personal Posts</Button>}
        </div>
        <Box align='start'>
            { <Link style={{textDecoration:'none'}} to='/home/profile'><Button style={{color:'black',backgroundColor:'green'}}> Profile Edit</Button></Link> } 
            </Box>
        <Box align='end'>

         {firstView && <Link style={{textDecoration:'none'}} to='/home/addpost'><Button style={{color:'red',backgroundColor:'yellow'}}> + Upload Post</Button></Link> } 
        </Box>
        <div align='center' style={{margin:'50px'}}>
        {poster.length ==0 ? <h1 style={{color:'red'}}>empty</h1> : ''}
        </div>
       
        {poster && 
        poster.map((obj,key)=>
        <div style={{float:'left' ,margin:'3%'}}>
            <div style={{backgroundColor:'white'}} align='center'>
             {firstView &&  <Button onClick={()=>navigate(`editpost/${obj.id}/`)} variant='contained' color='error'>Edit</Button> }
            </div>
      

            {/* for showing the books like a card structure */}

        <Card sx={{ display: 'flex' ,width:'500px' ,height:'400px',minHeight:'200px'}}>
            
    `       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>     
                    <Typography component="div" variant="h5" style={{fontWeight:800}}>
                        <DoubleArrowIcon  fontSize='small'/> {obj.movie_name}
                    </Typography>
                    <Typography variant="p" color="r">
                        {obj.type }
                    </Typography>
                    {/* <Typography variant="subtitle1" color="red" component="div">
                        <PersonPinIcon fontSize='small'/> {obj.author}
                    </Typography> */}
                    <Typography className='mt-2' variant="body2" color="gray">
                        {obj.movie_description}
                    </Typography>        
                </CardContent>
                <Box >    
                <p>{String(obj.created).slice(0,10).split("-").reverse().join("-")}</p>
                <div align='center' style={{color:'white',backgroundColor:'red'}}>
                {firstView ? ' ' :<><p>owner</p><h4>{obj.user.name}</h4></> }
                </div>
            
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 251,height:251,margin:'20px' }}
                image={obj.image}
                alt="Live from space album cover"
                />
                
        </Card> 
      
        </div>  )}
    </div>
  )
}

export default Home