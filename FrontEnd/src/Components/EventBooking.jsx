import React, { useContext, useEffect, useState } from 'react';
import '../Assets/Css/EventBooking.css';
import { Context } from './GlobeData'
import toast from 'react-hot-toast';
import { getUserById, PostUser } from '../Assets/Api/UserApi';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { blue } from '@mui/material/colors';
import { getTopManagers, PostEventReqToAll } from '../Assets/Api/ManagerApi';
import Boy from '../Assets/Datas/AboutData';
// import { Rating } from '@mui/material';
import RatingStar from './RatingStar';
import { AddNewEventOnEvent } from '../Assets/Api/EventApi';
import ViewManaDetails from './ViewManaDetails';
import { EventPlace, EventTypes } from '../Assets/Datas/EventData';

const EventBooking = () => {

  const {User,Update,Theme} = useContext(Context);

  const navi = useNavigate();
  const [Mana,setMana] = useState([]);
  const [ByPlace,setByPlace] = useState([]);
  const [place,setPlace] = useState("");
  const [VVisi,setVVisi] = useState("hidden");
  const [view,setView] = useState([]);

  const [data,setData] = useState({ename:"",description:"",type:"",place:"",publicevent:false,fee:"",budget:"",expecetdPeople:"",eventdateTime:"",ManaVisi:[]})

  useEffect(()=>{
    const FetchMana = async() =>{
      const res = await getTopManagers();
      await setMana(res.data || []);
      await setByPlace(res.data || []);
    }

    FetchMana();

  },[])

  useEffect(()=>{

    const filtered = Mana.filter((mana)=>
    mana.city.toLowerCase().includes(place.toLowerCase()));
    setByPlace(filtered);

  },[place,Mana])

  const EventSubmit = async() =>{

    if(data.ename.length === 0)
    {
      toast.error("Event Name is required");
      return;
    }
    else if(data.description.length === 0)
      {
        toast.error("Description is required");
        return;
      }
    else if(data.type.length === 0)
      {
        toast.error("Event Type is required");
        return;
      }
    else if(data.place.length === 0)
      {
        toast.error("Event Place is required");
        return;
      }
      else if(data.budget.length === 0)
      {
        toast.error("Event Budget is required");
        return;
      }
      else if(data.expecetdPeople.length === 0)
        {
        toast.error("Expected Number of People is required");
        return;
      }
      else if(data.eventdateTime.length === 0)
        {
        toast.error("Event Time is required");
        return;
      }
      else if(new Date() > new Date(data.eventdateTime))
      {
        toast.error("We cannot Travel to the Past");
        return;
      }
      else if(((new Date(data.eventdateTime) - new Date())/(1000 * 60 * 60)) < 24)
      {
        toast.error("Event Time must be at least 24 hours away");
        return;
      }
      else
      {
        await AddNewEventOnEvent(data,User.id);
        // const maxId = Math.max(NU.data.eventsOrganised?.map(({id})=>id));
        // await PostEventReqToAll(maxId);
        const res = await getUserById(User.id);
        console.log(res.data);
        await Update(res.data);
        toast.success("Event Booked Successfully!");
        setTimeout(()=>{
          navi('/Events')
        },2500)
      }

  }

  return (
    <div className={'EventBookingBaseDiv '+((Theme)?"ThemeDarkBG":"ThemeLightBG")}>
      <ViewManaDetails Mana = {{manager:view[0],VVisi,setVVisi}}/>
        <div className={"EventBookingMainDiv "+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>
          <div className="EventBookingHeader">Book Your Event</div>
          <form  className="EventBookingForm" onSubmit={(event)=>{event.preventDefault();EventSubmit()}}>
            <label htmlFor='EventName'>
              <input placeholder='EventName' value={data.ename} onChange={(event)=>{setData({...data,ename:event.target.value})}} type="text" id='EventName' className="EBEventName" />
            </label>
            <label htmlFor='EventDescription' id='EventDescriptionLabel'>
              <textarea placeholder='EventDescription' value={data.description} onChange={(event)=>{setData({...data,description:event.target.value})}} type="text" id='EventDescription' className="EBEventDescription" />
            </label>
            <label htmlFor='EventType'>
              <select value={data.type} onChange={(event)=>{setData({...data,type:event.target.value})}} id='EventType' className="EBEventType">
                <option value="" selected disabled hidden>Select The Event Type</option>
                {EventTypes.map((e,index)=>
                <option key={index} value={e.tname}>{e.tname}</option>
              )}
              </select>
            </label>
            <label htmlFor='EventPlace'>
              <select value={data.place} onChange={(event)=>{setData({...data,place:event.target.value})}} id='EventPlace' className="EBEventPlace">
                  <option value="" selected disabled hidden>Select The Event Place</option>
                  {EventPlace.map((e,index)=>
                  <option key={index} value={e.place}>{e.place}</option>
                )}
                </select>            
              </label>
            <label htmlFor='EventPublic' id='PublicEventCB'>
              <span>Public Event</span>
              <input type="checkbox" checked={data.publicevent} onChange={(event)=>setData({...data,publicevent:event.target.checked})} id='EventPublic' className="EBEventPublic" />
            </label>
            <label htmlFor='EventFee' title='Event Fee'>
              <input placeholder='EventFee' value={data.fee} onChange={(event)=>{setData({...data,fee:event.target.value})}} type="number" id='EventFee' className="EBEventFee" />
            </label>
            <label htmlFor='EventBudget' title='Event Budget'>
              <input placeholder='EventBudget' value={data.budget} onChange={(event)=>{setData({...data,budget:event.target.value})}} type="text" id='EventBudget' className="EBEventBudget" />
            </label>
            <label htmlFor='EventExpectedPeople' title='Expected People'>
              <input placeholder='EventExpectedPeople' value={data.expecetdPeople} onChange={(event)=>{setData({...data,expecetdPeople:event.target.value})}} type="number" id='EventExpectedPeople' className="EBEventExpectedPeople" />
            </label>
            <label htmlFor='EventTime' title='Event Date & Time'>
              <input placeholder='EventTime' value={data.eventdateTime} onChange={(event)=>{setData({...data,eventdateTime:event.target.value})}} type="datetime-local" id='EventTime' className="EBEventTime" />
            </label>

            <div className='ManagersShowDiv'>
              <div className="ManagerHeadingOnEB">
              <div>Managers</div>
              <div className='SendToAll'><p>SendToAll</p> <span><SendIcon sx={{color:blue.A400}}/></span></div>
              </div>
              <div className="PlaceSearchDiv"><input value={place} placeholder='Search By Place' onChange={(event)=>setPlace(event.target.value)} /></div>
              <div className='ManagersDtsDivonSD'>
                {ByPlace.map((mana,index)=>(
                  <div className="ManaDivWithImgOnSC"  key={index}>
                    <img src={mana.profImg?mana.profImg:Boy} alt={mana.firstName} />
                    <div>{mana.firstName} {mana.lastName}</div>
                    <div><RatingStar reviews={mana.review} /></div>
                    <div style={{opacity:0.6,cursor:"pointer"}} onClick={()=>{view[0]=mana;setVVisi("visible")}}>View More...</div>
                  </div>
                ))}
              </div>
            </div>

            <button type='submit' className="EventSubmitBtn">Apply</button>
          </form>
        </div>
    </div>
  )
}

export default EventBooking