import React, { useContext, useEffect, useState } from 'react'
import { Context } from './GlobeData'
import '../Assets/Css/DashBoard.css'
import Navbar from './Navbar';
import Footer from './Footer';
import { EventStatusUpdate, GetEventsByManaId, GetEventsByOrganId, getManaNeedEvents } from '../Assets/Api/EventApi';
import { getUserById } from '../Assets/Api/UserApi';
import RatingStar from './RatingStar';
import Boy from '../Assets/Datas/AboutData';
import { EventTypes } from '../Assets/Datas/EventData';

const DashBoard = () => {
  const{Theme,User,Update} = useContext(Context);
  const [ER,setER] = useState([]);
  const [Event,setEvent] = useState([]);
  const [dispDiv,setDD] = useState("Current");
  const [Changes,setChange] = useState(true);
  const [StateOfCard,setSOC] = useState([]);

  useEffect(()=>{

    const FetchER = async()=>{
      const res = await getManaNeedEvents();
      if(User.mana)
      setER(res.data || []);
      else
      setER(res.data.filter(({status})=>(status === "payPending" || status === "Not Accepted")));
    }

    const FetchEvents = async() =>{
      if(User.mana)
      {
        const res = await GetEventsByManaId(User.manager.id);
        if(dispDiv === "Current")
          setEvent(res.data.filter(({status})=> status === "OnGoing"));
        else
        setEvent(res.data.filter(({status})=> status === "Completed"));
    }
    else
    {
      const res = await GetEventsByOrganId(User.id);
        if(dispDiv === "Current")
        setEvent(res.data.filter(({status})=> status === "OnGoing"));
        else
        setEvent(res.data.filter(({status})=> status === "Completed"));
      }
      setSOC(Event.filter(()=>false));
    }
    if(dispDiv === "Reqs")
      FetchER();
    else
      FetchEvents();
  },[Changes])

  const UpdateStatus =async(event)=>{

    console.log("Hello");
    
      if(User.mana)
      {
        const res = await EventStatusUpdate(event.id,User.manager.id,"payPending");
        alert(res.data);
        await Update((await getUserById(User.id)).data);
        setChange(!Changes);
      }
      else if(event.status === "payPending")
      {
        const res = await EventStatusUpdate(event.id,-1,"OnGoing");
        alert(res.data);
        await Update((await getUserById(User.id)).data);
        setChange(!Changes);
      }
  } 

  const Image = (type)=>{
    for(const E in EventTypes)
    {
        const e = EventTypes[E];
        if(e.tname === type)
        return e.img;
    }
    return null;
}

  return (
    <div className={'DashBaseDiv '+((Theme)?"ThemeDarkBG":"ThemeLightBG")}>

        <div className="NavDivOnDash">
            <Navbar/>
        </div>

        <div className="DashMainDiv CenterFication">
          {/* <div className={"DashBoardHero "+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>

          </div> */}
          <div className="DashBoardContents">
            <div className="DBHeadings">
              <div className={"HeadingsName HN-1 "+((dispDiv === "Current")?"UpperLift":"")} onClick={()=>{setDD("Current");setChange(!Changes)}}>Events</div>
              <div className={"HeadingsName HN-2 "+((dispDiv === "Passed")?"UpperLift":"")} onClick={()=>{setDD("Passed");setChange(!Changes)}}>Passed Events</div>
              <div className={"HeadingsName HN-3 "+((dispDiv === "Reqs")?"UpperLift":"")} onClick={()=>{setDD("Reqs");setChange(!Changes)}}>Event Request</div>
            </div>
            {(dispDiv === "Current" || dispDiv === "Passed")?
            <div className="CurrentORPassedEventDB EDB">
              {Event.map((event,index)=>
                <div key={index} className={`EventDivONDBC EDONDBC-${index}`} onMouseEnter={()=>{const div = document.querySelector(`.EDONDBC-${index}`);div.classList.add("LiftUpMagic")}} onMouseLeave={()=>{const div = document.querySelector(`.EDONDBC-${index}`);div.classList.remove("LiftUpMagic")}}>
                  <div className="EventInnerDivONDBC" style={{transform:StateOfCard[index]?"rotateY(180deg)":""}} onClick={()=>{const newArr = [...StateOfCard];newArr[index]=!newArr[index];setSOC(newArr)}}>
                  <div className="FrontDivOnCPDBC">
                    <div className='TopOnFrontDivCPDBC'>
                    <div className='EImageONFrontDivCPDBC'>
                      <img src={Image(event.type)} style={{width:"100%",height:"100%"}} alt={event.ename} />
                    </div>
                    <div className='ENameONFrontDivCPDBC'>{event.ename}</div>
                    </div>
                    <div className='MiddleOnFrontDivCPDBC'>
                    <div className='EDescriptionONFrontDivCPDBC'>{event.description}</div>
                    </div>
                    <div className='BottomOnFrontDivCPDBC'>
                      <div className='PlaceONFrontDivCPDBC'>{event.place}</div>
                      <div className='TypeONFrontDivCPDBC'>{event.type}</div>
                    </div>
                  </div>
                  <div className="BackDivOnCPDBC">
                  <div className='TopOnBackDivCPDBC'>
                  <div className='MImageONBackDivCPDBC'>
                      <img src={(User.mana)?event?.organiser?.profImg?event.organiser.profImg:Boy:event?.manager?.profImg?event.manager.profImg:Boy} style={{width:"100%",height:"100%"}} alt={(User.mana)?event.organiser.uname:event.manager.firstName} />
                    </div>
                    <div className='ManagerNameONBackDivCPDBC'>
                      <p></p>
                    <p style={{color:"darkorange"}}>{User.mana?"Organiser":"Manager"}</p>
                    <p>{(User.mana)?event.organiser.uname:event.manager.firstName+" "+event.manager.lastName}</p>
                    {(User.mana)?null:<RatingStar reviews={event.manager.review} />}
                    </div>
                  </div>
                  <div className='BottomOnBackDivCPDBC'>
                  <div className='HeadingONBBDCPDBC'>Date</div><div className='ContentONBBDCPDBC'>{new Date(event.eventdateTime).toLocaleDateString()}</div>
                  <div className='HeadingONBBDCPDBC'>Time</div><div className='ContentgONBBDCPDBC'>{new Date(event.eventdateTime).toLocaleTimeString()}</div>
                  <div className='HeadingONBBDCPDBC'>Budget</div><div className='ContentgONBBDCPDBC'>{event.budget}</div>
                  <div className='HeadingONBBDCPDBC'>Entry Fee</div><div className='ContentgONBBDCPDBC'>{(event.fee > 0)?event.fee:"Free"}</div>
                  <div className='HeadingONBBDCPDBC'>Participants</div><div className='ContentgONBBDCPDBC'>{event.participants?.length}</div>
                  <div className='PubOrPriONBBDCPDBC' style={{color:(event.publicevent)?"green":"red"}}>{event.publicevent?"Public Event":"Private Event"}</div>
                  <div className='PubOrPriONBBDCPDBC' style={{color:(new Date(event.eventdateTime).getDate()-new Date().getDate() > 3)?"blue":"red"}}>{new Date(event.eventdateTime).getDate()-new Date().getDate()}{new Date(event.eventdateTime).getDate()-new Date().getDate() > 1?" Days ":" Day "}To The Event </div>
                  </div>
                  </div>
                  </div>
                </div>
              )}
            {(Event.length === 0)?<div className='EventNotFoundONDB'>No Events!</div>:null}
            </div>:null}
            {(dispDiv === "Reqs")?
            <div className="ReqsEventDB EDB">
              {ER.map((event,index)=>
              <div key={index} className={'EventCardDiv '+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>
                <div className="LeftDivONEC">
                  <div className="EventImgONEC">
                    <img src={Image(event.type)} style={{width:"100%",height:"100%"}} alt={event.ename} />
                  </div>
                  <div className='EventNameONEC'>{event.ename}</div>
                </div>
                <div className="RightDivONEC">
                  <div className="HeadingONEC">Description</div>
                  <div className="DescriptionONEC">{event.description}</div>
                  <div className="OtherDtsONEC">
                    <div><div className='HeadingOnOtherDts'>Organiser</div><div className='ContentsOnOtherDts'> {event.organiser?.uname}</div></div>
                    <div><div className='HeadingOnOtherDts'>Location</div><div className='ContentsOnOtherDts'>{event.place}</div></div>
                    <div><div className='HeadingOnOtherDts'>Date</div><div className='ContentsOnOtherDts'>{new Date(event.eventdateTime).toLocaleDateString()}</div></div>
                    <div><div className='HeadingOnOtherDts'>Time</div><div className='ContentsOnOtherDts'>{new Date(event.eventdateTime).toLocaleTimeString()}</div></div>
                    <div><div className='HeadingOnOtherDts'>Type</div><div className='ContentsOnOtherDts'>{event.type}</div></div>
                    <div><div className='HeadingOnOtherDts'>Budget</div><div className='ContentsOnOtherDts'>{event.budget}</div></div>
                    <div><div className='HeadingOnOtherDts'>Entry Fee</div><div className='ContentsOnOtherDts'>{(event.fee > 0)?event.fee:"Free"}</div></div>
                    <div className='PubOrPriONODONEC' style={{color:(event.publicevent)?"green":"red"}}>{event.publicevent?"Public Event":"Private Event"}</div>
                    <div className='ChatWithOrganMana'>Chat</div>
                    <div className='ActionONEC' onClick={()=>{if(event.status === "Not Accepted" ||(!User.mana && event.status === "payPending"))UpdateStatus(event)}}>{User.mana?(event.status === "Not Accepted")?"Accept":"Payment Pending":(event.status === "payPending")?"Pay":"Pending"}</div>
                  </div>
                </div>
              </div>)}
              {(ER.length === 0)?<div className='EventNotFoundONDB'>No Events On Request Page</div>:null}
            </div>:null}
          </div>
        </div>

        <div className="FooterDivOnDash">
            <Footer/>
        </div>

    </div>
  )
}

export default DashBoard