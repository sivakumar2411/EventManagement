import { Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'

const RatingStar = ({reviews}) => {
    const [val,setVal]= useState(0);
    useEffect(()=>
    {
        const rateavg=()=>
        {
            if(reviews?.length===0)
            setVal(0);
            else if(reviews?.length > 0){
                const trate=reviews?.reduce((sum,{rating})=>sum+rating,0);
                setVal(trate/reviews?.length);
            }
        }
        rateavg();
    },[])
  return (
    <div title={val}><Rating value={val} precision={0.1} readOnly/></div>
  )
}

export default RatingStar