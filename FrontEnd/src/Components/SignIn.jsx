import React, { useContext, useEffect, useState } from 'react'
import { Context } from './GlobeData'
import toast from 'react-hot-toast';
import ToasterFunc from './ToasterFunc';
import { useNavigate} from 'react-router-dom';
import { LogInApi } from '../Assets/Api/UserApi';
// import { getAllUsers, LogInApi } from '../Assets/Api/UserApi';

const SignIn = (props) => {

  const {LOGIN,User,Theme} = useContext(Context);
  const {LogIn,setLogIn} = props.Log;
  const navi = useNavigate()

  const [user,setuser] = useState({uname:"",password:""});
  // const [userEx,setUE] = useState({});


  const Login =async()=>
  {
    if(user.uname.length === 0)
      toast.error("UserName is required");
    else if(user.password.length === 0)
      toast.error("Password is required");
    else
    {

      // const emEx = (euser)?euser.findIndex(({email})=>email === user.uname):-1;
      // const unEx = (euser)?euser.findIndex(({uname})=>uname === user.uname):-1;

      // if(emEx === -1 && unEx === -1)
      // {
      //   toast.error("Email/UserName does not exist!");
      //   return;
      // }
      // else{
      //   const ind = Math.max(emEx, unEx);
      //   if(euser[ind].password !== user.password)
      //   {
      //     toast.error("Password is incorrect!");
      //     return;
      //   }
        
      //   toast.success("Logged in!");
      //   setTimeout(()=>{
      //     LOGIN(euser[ind]);
      //     navi('/Home');
      //   },2500)
      // }

      const res = await LogInApi(user.uname, user.password);

      if(!res.data)
      {
        toast.error("Something went wrong");
        return;
      }
      else
      {
        toast.success("Logged in!");
        setTimeout(()=>{
          LOGIN(res.data);
          navi('/Home');
        },2500)
      }
    }
  }

  // useEffect(()=>{

  //   const getUD=async()=>{
  //     const res = await getAllUsers();
  //     setEU(res.data);
  //     console.log(res);
      
  //   }

  //   getUD();

  // },[])


  return (
    <div className='SignInDiv CenterFication'>
      <ToasterFunc/>
      <h2>SignIn</h2>
      <div className='SignInMainDiv CenterFication'>
        <form onSubmit={(event)=>{event.preventDefault();Login()}} className='SignINFORM CenterFication'>
            {/* <label>Email or UserName</label> */}
            <input type="text" value={user.uname} onChange={(event)=>setuser({...user,uname:event.target.value})} className={'EmailInput '+((Theme)?"Dark":"Light")}  placeholder='Email or UserName'/>
            {/* <label>PassWord</label> */}
            <input type='password' value={user.password} onChange={(event)=>setuser({...user,password:event.target.value})} className={'EmailInput '+((Theme)?"Dark":"Light")}  placeholder='PassWord'/>
            <button type='submit' className='SignInButton'>SignIn</button>
        </form>
        <div className='SignInToSignUpDiv'>Create a New Account? <span className="" onClick={(event)=>{setLogIn(false)}}> SignUp</span></div>
      </div>
    </div>
  )
}

export default SignIn