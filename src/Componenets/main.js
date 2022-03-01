import '../Componenets/main.css';
import img from '../image/map.png';
import { useEffect, useState } from 'react';
import App from '../App';
import { Alert } from 'bootstrap';
// const cors = require('cors')



// past rides
// nearest
// upcoming

const isFutureDate = (date) => new Date(date) > new Date();

function Mainpage() {
  const [currentTab, setCurrentTab] = useState("nearest")
  const [rides, setRides] = useState([]);
  const [user, setUser] = useState({});
  const [nearrideId, setnearrideId] = useState([]);
  var v = ["hello"]
  var Selectedcity = null;
  var Selectedstate = null;
  

  useEffect(() => {
    (async () => {
      try {
        const requestUser = await fetch("/user")
        setUser(await requestUser.json());
        const requestRides = await fetch("/rides")
        setRides(await requestRides.json());
      } catch (error) {
        console.error("ye hai errrrr =>", error)
      }
    })()

  }, [])

  const onChangeTab = (tabName) => {
    setCurrentTab(tabName);
  };

  const pastRides = !rides.length ? [] : rides.filter(ride => !isFutureDate(ride.date))

  const futureRides = !rides.length ? [] : rides.filter(ride => isFutureDate(ride.date))

  const nearestRides2 = !rides.length || !user.station_code ? [] : rides.filter(ride => {
    const stationCodeExists = ride.station_path.includes(user.station_code+1);
    return stationCodeExists


  }).sort((a, b) => {
    const aStations = [a.origin_station_code, ...a.station_path, a.destination_station_code]
    const bStations = [b.origin_station_code, ...b.station_path, b.destination_station_code]
    return aStations.indexOf(user.station_code) < bStations.indexOf(user.station_code) ? -1 : 1
  })

  const nearestRides3 = !rides.length || !user.station_code ? [] : rides.filter(ride => {
    const stationCodeExists = ride.station_path.includes(user.station_code+2);
    return stationCodeExists


  }).sort((a, b) => {
    const aStations = [a.origin_station_code, ...a.station_path, a.destination_station_code]
    const bStations = [b.origin_station_code, ...b.station_path, b.destination_station_code]
    return aStations.indexOf(user.station_code) < bStations.indexOf(user.station_code) ? -1 : 1
  })


  const nearestRides = !rides.length || !user.station_code ? [] : rides.filter(ride => {
    const stationCodeExists = ride.station_path.includes(user.station_code);
    return stationCodeExists
  }).sort((a, b) => {
    const aStations = [a.origin_station_code, ...a.station_path, a.destination_station_code]
    const bStations = [b.origin_station_code, ...b.station_path, b.destination_station_code]
    return aStations.indexOf(user.station_code) < bStations.indexOf(user.station_code) ? -1 : 1
  })
 



  // function Filter() {
  //   var city = document.getElementById("city");
  //   var state = document.getElementById("state")

  //   Selectedcity = city.options[city.selectedIndex].value
  //   Selectedstate = state.options[state.selectedIndex].text
    
   

  // }
 
  function Hide()
  {
    document.getElementById("near2").style.display = "none";
    document.getElementById("near3").style.display = "none";
  }
  function Show()
  {
    document.getElementById("near2").style.display = "block";
    document.getElementById("near3").style.display = "block";
  }


  return (
    <div className="Mainpage">
      <nav class="navbar navbar-light bg-light justify-content-between" className='navbar'>
        <h2 className='Title'>Edvora</h2>

        <div classN="row">
          <span className='UserName'>{user.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img src={user.url} className='profileImg' />




        </div>
      </nav>

      <button onClick={() => {
        onChangeTab("nearest")
        Show()
      }}>nearest Rides</button>
      <button onClick={() => {
        onChangeTab("upcoming");
        Hide()
      }}>Upcoming rides</button>
      <button onClick={() => {
        onChangeTab("past")
        Hide()
      }}>Past Rides</button>

      {/* <select class="form-control" id='city'>
      <option value="" disabled selected>Select City</option>
        {
          rides.map((ride) => {
            return (
              <option>{ride.city}</option>
            )
          })
        }
      </select>
      <select class="form-control" id='state'>
        {
          rides.map((ride) => {
            return (
              <option>{ride.state}</option>
            )
          })
        }
      </select> */}

      
      {
        // currentTab === "nearest" ? JSON.stringify(nearestRides, null, 2) :

        
        currentTab === "nearest" ?  nearestRides.map((ride)=>{
          return (
              <div class="row" className='Row'>
                <div class="col-md-4" className='img'>
                <img src={img}/>
                </div>
                <div class="col-md-6" className='Text'>
                  <ul>
                    <li>ride id : {ride.id}</li>
                    <li>origin_station : {ride.origin_station_code}</li>
                    <li>station_path : [{ride.station_path}]</li>
                    <li>Date : {ride.date}</li>
                    <li>Distance : 0</li>
                  </ul>
                </div>
              </div>
          )
        }) :
          currentTab === "past" ?  pastRides.map((ride)=>{
            return (
              <div class="row" className='Row'>
                <div class="col-md-4" className='img'>
                <img src={img}/>
                </div>
                <div class="col-md-6" className='Text'>
                  <ul>
                    <li>ride id : {ride.id}</li>
                    <li>origin_station : {ride.origin_station_code}</li>
                    <li>station_path : [{ride.station_path}]</li>
                    <li>Date : {ride.date}</li>
                  </ul>
                </div>
              </div>
          )
           }) :
            currentTab === "upcoming" ? futureRides.map((ride)=>{
              return (
                <div class="row" className='Row'>
                  <div class="col-md-4" className='img'>
                  <img src={img}/>
                  </div>
                  <div class="col-md-6" className='Text'>
                    <ul>
                      <li>ride id : {ride.id}</li>
                      <li>origin_station : {ride.origin_station_code}</li>
                      <li>station_path : [{ride.station_path}]</li>
                      <li>Date : {ride.date}</li>
                    </ul>
                  </div>
                </div>
            )
             })
              : null

              
      }

       {
         <div id='near2'>
           {
              nearestRides2.map((ride)=>{
                return (
                  <div class="row" className='Row'>
                    <div class="col-md-4" className='img'>
                    <img src={img}/>
                    </div>
                    <div class="col-md-6" className='Text'>
                      <ul>
                        <li>ride id : {ride.id}</li>
                        <li>origin_station : {ride.origin_station_code}</li>
                        <li>station_path : [{ride.station_path}]</li>
                        <li>Date : {ride.date}</li>
                        <li>Distance : 1</li>
                      </ul>
                    </div>
                  </div>
              )
               })
           }
         </div>
        
       }

       {
         <div id='near3'>
           {
              nearestRides3.map((ride)=>{
                return (
                  <div class="row" className='Row'>
                    <div class="col-md-4" className='img'>
                    <img src={img}/>
                    </div>
                    <div class="col-md-6" className='Text'>
                      <ul>
                        <li>ride id : {ride.id}</li>
                        <li>origin_station : {ride.origin_station_code}</li>
                        <li>station_path : [{ride.station_path}]</li>
                        <li>Date : {ride.date}</li>
                        <li>Distance : 2</li>
                      </ul>
                    </div>
                  </div>
              )
               })
           }
         </div>
           
       }
          
        
        




    </div>
  );
}

export default Mainpage;