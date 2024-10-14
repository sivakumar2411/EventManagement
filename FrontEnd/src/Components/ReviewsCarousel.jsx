import React, { useEffect, useState } from 'react';
import '../Assets/Css/ReviewCarousel.css';
import Boy from '../Assets/Datas/AboutData';


const ReviewsCarousel = ({reviews}) => {

    const [ind,setInd] = useState(0);
    const [animationClass,setAC] = useState("RCLTOR");
    const [intervalTime,setIT] = useState(5000);

    useEffect(()=>{

        const changeInd = () =>{
            if(ind < reviews.length - 1) setInd(ind + 1);
            else setInd(0);
        }

        if(reviews && reviews.length > 0)
        {
            const inter = setInterval(()=>{
                setAC("");
                setTimeout(()=>{
                    setAC("RCLTOR");
                    changeInd();
                },100);
        },intervalTime)
        return()=>clearInterval(inter);
        }

    },[ind])

    const leftClick = () =>{
        setAC("");
        setTimeout(()=>{
            setAC("RCRTOL");
            if(ind > 0) setInd(ind - 1);
            else setInd(reviews.length - 1);
        },100);
        setIT(5000);
    }
    
    const rightClick = () =>{
        setAC("");
        setTimeout(()=>{
            setAC("RCLTOR");
            if(ind < reviews.length - 1) setInd(ind + 1);
            else setInd(0);
        },100);
        setIT(5000);
    }

  return (
    <div className={'ReviewCarasouelBaseDiv '}>
        {(!reviews || reviews?.length === 0)?<></>:
        <><div className='ClickONRC LRC' onClick={()=>leftClick()}>{'<'}</div>
        <div className='ClickONRC RRC' onClick={()=>rightClick()}>{'>'}</div></>}
        <div className={'ReviewCarasouelMainDiv '+((animationClass))}>
        {(!reviews || reviews?.length === 0)?
        <p style={{opacity:0.5}}>No Reviews</p>:
        <>
        <div className='ReviewCarasouelHeadingDiv'>
            <div className='ReviewerImgONRCHD'>
                <img style={{width:"100%",height:"100%",borderRadius:"50%"}} src={reviews[ind]?reviews[ind].reviewer?.profImg?reviews[ind].reviewer.profImg:Boy:Boy} alt={reviews[ind]?reviews[ind].reviewer.uname:""} />
            </div>
            <div className='ReviewerNameONRCHD'>{reviews[ind]?reviews[ind].reviewer.uname:"User"}</div>
        </div>
        <div className='ReviewCarasouelBodyDiv'>
            {reviews[ind]?reviews[ind].review:""}
        </div>
        </>}
        </div>
    </div>
  )
}

export default ReviewsCarousel