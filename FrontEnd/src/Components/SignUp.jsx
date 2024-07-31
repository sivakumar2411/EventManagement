import React, { useContext, useEffect, useState } from 'react'
import { Context } from './GlobeData';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ToasterFunc from './ToasterFunc';
import { getAllUsers, PostUser } from '../Assets/JSON/Api';

const SignUp = (props) => {

  const {Theme , LOGIN , AUsers} = useContext(Context);
  const {LogIn,setLogIn} = props.Log;
  const navi = useNavigate();

  const [user,setUser] = useState({uname:"",email:"",password:""});
  const [cpass,setCpass] = useState("");
  const [euser,setEU] = useState([]);

  const Signup = async() =>{

    if(user.uname.length === 0)
      toast.error("UserName is required");
    else if(user.email.length === 0)
      toast.error("Email is required");
    else if(user.password.length === 0)
      toast.error("Password is required");
    else if(user.password.length < 8)
      toast.error("Password is Too Short");
    else if(cpass.length === 0)
      toast.error("Confirm Password is required");
    else if(user.password!== cpass)
      toast.error("Passwords do not match");
    else{
      const emExist = (euser)? euser.findIndex(({email})=>email === user.email):-1;
      const unameExist = (euser)?euser.findIndex(({uname})=>uname === user.uname):-1;

      if(emExist !== -1)
      {
        toast.error("Email already exists");
        return;
      }
      else if(unameExist!== -1)
      {
        toast.error("UserName already exists");
        return;
      }

      const NUser = {
        ...user,
        gender:"Male",
        region:"Asia",
        about:" ",
        isAdmin:false,
        isManager:false,
        isBooking:false,
        profImg:"",
        ParticipatedEvents:[],
      }

      await PostUser(NUser);
      toast.success("Signed up!")
      setTimeout(()=>{
        console.log(NUser);
        LOGIN(NUser);
        navi("/Home")
      },2500)
    }
  }

  useEffect(()=>{

    const getUD = async() =>{

      const res = await getAllUsers();
      setEU(res.data);

    }

    getUD();

  },[])


  return (
    <div className='SignUpDiv CenterFication'>
      <ToasterFunc/>
      <h2>SignUp</h2>
      <div className='SignUpMainDiv CenterFication'>
        <form onSubmit={(event)=>{event.preventDefault();Signup()}} className='SignUpFORM CenterFication'>
            {/* <label>UserName</label> */}
            <input type='text' value={user.uname} onChange={(event)=>setUser({...user,uname:event.target.value})} className={'EmailInput '+((Theme)?"Dark":"Light")}  placeholder='UserName'/>
            {/* <label>Email</label> */}
            <input type='email' value={user.email} onChange={(event)=>setUser({...user,email:event.target.value})} className={'EmailInput '+((Theme)?"Dark":"Light")}  placeholder='Email'/>
            {/* <label>PassWord</label> */}
            <input type='password' value={user.password} onChange={(event)=>setUser({...user,password:event.target.value})} className={'EmailInput '+((Theme)?"Dark":"Light")}  placeholder='PassWord'/>
            {/* <label>Confirm PassWord</label> */}
            <input type='password' value={cpass} onChange={(event)=>setCpass(event.target.value)} className={'EmailInput '+((Theme)?"Dark":"Light")}  placeholder='Confirm PassWord'/>
            <button type='submit' className='SignUpButton'>SignUp</button>
        </form>
        <div className='SignUpToSignInDiv'>Create a New Account? <span className="" onClick={(event)=>{setLogIn(true)}}> SignIn</span></div>
      </div>
    </div>
  )
}

export default SignUp