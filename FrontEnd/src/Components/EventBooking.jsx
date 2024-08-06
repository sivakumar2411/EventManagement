import React, { useContext } from 'react';
import '../Assets/Css/EventBooking.css';
import { Context } from './GlobeData'


const EventBooking = () => {

  const {User,Theme} = useContext(Context);

  return (
    <div className={'EventBookingBaseDiv '+((Theme)?"ThemeDarkBG":"ThemeLightBG")}>
        <div className={"EventBookingMainDiv "+((Theme)?"ThemeDarkDiv":"ThemeLightDiv")}>
          <div className="EventBookingHeader">Book Your Event</div>
          <form  className="EventBookingForm">
            
          </form>
        </div>
    </div>
  )
}

export default EventBooking