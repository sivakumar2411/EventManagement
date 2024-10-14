// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home.jsx'
// import SignUp from './Components/SignUp.jsx';
// import SignIn from './Components/SignIn.jsx';
import WrongUrl from './Components/WrongUrl.jsx';
import SignPage from './Components/SignPage.jsx';
import Events from './Components/Events.jsx';
import About from './Components/About.jsx';
import Profile from './Components/Profile.jsx';
import Admin from './Components/Admin.jsx';
import { useContext } from 'react';
import { Context } from './Components/GlobeData.jsx';
import DashBoard from './Components/DashBoard.jsx';
import ManagerApplication from './Components/ManagerApplication.jsx';
import EventBooking from './Components/EventBooking.jsx';

function App() {

  const {LoggedIn,User} = useContext(Context);

  return (
    <Routes>
      <Route path="/" exact element={<Home/>} />
      <Route path="/Home" element={<Home/>} />
      <Route path="/Events" element={<Events/>} />
      <Route path="/About" element={<About/>} />
      <Route path="/Sign" element={<SignPage/>} />
      {(LoggedIn)?<><Route path="/Profile" element={<Profile/>}/>
        {(User?.mana || User?.eventsOrganised?.length > 0)?<Route path='/DashBoard' element={<DashBoard/>} />:null}
        <Route path='/ManagerApplication' element={<ManagerApplication/>}/>
        {(!User?.mana)?<Route path='/EventBooking' element={<EventBooking/>}/>:null}
        {(User?.admin)?<Route path="/Admin" element={<Admin/>}/>:null}
        </>:null}
      <Route path='*' exact element={<WrongUrl/>}/>
    </Routes>
  );
}

export default App;
