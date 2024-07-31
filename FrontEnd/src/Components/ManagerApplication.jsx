import React, { useContext, useState } from 'react'
import { Context } from './GlobeData';
import '../Assets/Css/ManagerApplication.css'
import ToasterFunc from './ToasterFunc';
import toast from 'react-hot-toast';
import { PostForManagerReqs } from '../Assets/JSON/Api';


const ManagerApplication = () => {

    const {Theme,User} = useContext(Context); 

    const [data,setData] = useState({u_id:User.id,firstName:"",lastName:"",birthDate:"",address:"",city:"",state:"",postCode:"",email:"",mobNo:"",exp:"",resume:""})

    const ValidationAndReq = async() =>{
        if(data.firstName.length === 0)
        {
            toast.error("FirstName Required");
            return;
        }
        else if(data.lastName.length === 0)
        {
            toast.error("LastName Required");
            return;
        }
        else if(new Date().getFullYear()-new Date(data.birthDate).getFullYear() < 20)
        {
            toast.error("Age Must Be At Least 20");
            return;
        }
        else if(data.city.length === 0)
        {
            toast.error("City Required");
            return;
        }
        else if(data.state.length === 0)
        {
            toast.error("State Required");
            return;
        }
        else if(data.postCode.length === 0)
        {
            toast.error("Post Code Required");
            return;
        }
        else if(data.postCode.length !== 6)
        {
            toast.error("Invalid Post Code");
            return;
        }
        else if(data.address.length === 0)
        {
            toast.error("Address Required");
            return;
        }
        else if(data.email.length === 0)
        {
            toast.error("Email Required");
            return;
        }
        else if(data.mobNo.length === 0)
        {
            toast.error("Mobile Number Required");
            return;
        }
        else if(data.mobNo.length !== 10)
        {
            toast.error("Invalid Mobile Number");
            return;
        }
        else if(data.exp.length === 0)
        {
            toast.error("Experience Required");
            return;
        }
        else
        {
            await PostForManagerReqs(data);
            toast.success("Application Submitted Successfully!");
        }
    }

  return (
    <div className={'ManaAppBaseDiv '+((Theme)?"ThemeDarkBG":"ThemeLightBG")}>
        <ToasterFunc/>

        <div className={"ManaMainDiv "+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>

            <form className="ManagerApplicationForm " onSubmit={(event)=>{event.preventDefault();ValidationAndReq();}}>
                <label htmlFor='ManaFormFirstName'>
                    <input placeholder='FirstName' value={data.firstName} onChange={(event)=>{setData({...data,firstName:event.target.value})}} type="text" id='ManaFormFirstName' className="MFFirstName" />
                </label>
                <label htmlFor='ManaFormLastName'>
                    <input placeholder='LastName' value={data.lastName} onChange={(event)=>{setData({...data,lastName:event.target.value})}} type="text" id='ManaFormLastName' className="MFFirstName" />
                </label>

                <label htmlFor='ManaFormBirthDate'>
                    <input placeholder='BirthDate' value={data.birthDate} onChange={(event)=>{setData({...data,birthDate:event.target.value})}} type="date" id='ManaFormBirthDate' className='MFBirthDate' />
                </label>

                <label htmlFor='ManaFormCurAddress'>
                    <input placeholder='Address' value={data.address} onChange={(event)=>{setData({...data,address:event.target.value})}} type="text" id='ManaFormCurAddress' className="MFCurAddress"/>
                </label>

                <label htmlFor='ManaFormCity'>
                    <input placeholder='City' value={data.city} onChange={(event)=>{setData({...data,city:event.target.value})}} type="text" id='ManaFormcity' className="MFCity" />
                </label>

                <label htmlFor='ManaFormState'>
                    <input placeholder='State' value={data.state} onChange={(event)=>{setData({...data,state:event.target.value})}} type="text" id='ManaFormState' className="MFState" />
                </label>

                <label htmlFor='ManaFormZipCode'>
                    <input placeholder='PostCode' value={data.postCode} onChange={(event)=>{setData({...data,postCode:event.target.value})}} type="text" id='ManaFormZipCode' className="MFZipCode" />
                </label>

                <label htmlFor='ManaFormEmail'>
                    <input placeholder='Email' value={data.email} onChange={(event)=>{setData({...data,email:event.target.value})}} type="email" id='ManaFormEmail' className="MFEmail" />
                </label>

                <label htmlFor='ManaFormContactNo'>
                    <input placeholder='Contact No' value={data.mobNo} type="text" onChange={(event)=>{setData({...data,mobNo:event.target.value})}} maxLength={10} id='ManaFormContactNo' className="MFContactNo" />
                </label>

                <label htmlFor='ManaFormExp'>
                    <input placeholder='Experience(In Years)' value={data.exp} onChange={(event)=>{setData({...data,exp:event.target.value})}} max={20} type="number" id='ManaFormExp' className='MFExp'/>
                </label>

                <label htmlFor='ManaFormResume'>
                    <span className='ResumeUploadDiv'>
                        Resume
                    <input placeholder='Resume' required onChange={(event)=>{setData({...data,resume:event.target.files[0]})}} style={{width:"0px",height:"0px",visibility:"hidden"}}  type='file' id='ManaFormResume' className='MFResume' />
                    </span>
                </label>

                <button type='submit' className="ManaSubmitBtn">Apply</button>

            </form>

        </div>

    </div>
  )
}

export default ManagerApplication