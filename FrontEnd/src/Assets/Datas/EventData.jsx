import Business from './EventTypeImages/Buisness.jpg';
import CorEvent from './EventTypeImages/CorEvent.jpg'
import Commu from './EventTypeImages/Social1.jpg';
import Social from './EventTypeImages/Social.jpg';
import Entertainment from './EventTypeImages/music.avif'
import Sport from './EventTypeImages/Sports.jpg'

export const EventTypes = [
    {img:Social,tname:"Social Events"},
    {img:CorEvent,tname:"Corporate Events"},
    {img:Commu,tname:"Community Events"},
    {img:Entertainment,tname:"Entertainment Events"},
    {img:Sport,tname:"Sports Events"},
    {img:"",tname:"Educational Events"},
    {img:Business,tname:"Networking Events"}
]

export const EventPlace = [
    {place:"Thoothukudi"},
    {place:"Tirunelveli"},
    {place:"Madurai"},
    {place:"SivaKasi"},
    {place:"Namakkal"},
    {place:"KanniyaKumari"},
    {place:"Coimbatore"},
    {place:"Chennai"},
    {place:"Bengaluru"},
]

export const EventFee = [
    {val:0,fee:"Free"},
    {val:100,fee:"Under 100 Rs"},
    {val:500,fee:"100 - 500 Rs"},
    {val:1000,fee:"500 - 1000 Rs"},
    {val:5000,fee:"1000 - 5000 Rs"},
    {val:10000,fee:"5000 - 10000 Rs"},
    {val:11000,fee:"More Than 10000 Rs"}
]