import {withRouter} from 'react-router';

import getIssuesSorted from '../../server/api-map';
import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import "./Dashboard.css"


const Dashboard = ({ google }) => {
    const [from, setFrom] = useState({lat: 48.8450234, lng: 2.3997529});
    const [issues, setIssues] = useState([])
    
    useEffect(() => {
        if ("geolocation" in navigator) {
            console.log("Available");
            navigator.geolocation.getCurrentPosition((position) =>{
                setFrom({lat: position.coords.latitude, lng: position.coords.longitude});
            });
            
        } else {
            console.log("Not Available");
        }
        getIssuesSorted(from, 70000).then(value => {
            setIssues(value);
        });
    }, []);
    let id=0;
    console.log("ISSUES");
    console.log(issues);
    return (
        <>
            <input placeholder="Recherche" size="50" height="100"> 
            </input>
            <div className="overall" width="100%">
                <div className="issue">
                <div className="item" >
                        <div>
                            <ul>
                                { issues.map(e => {
                                        id++;
                                        return (
                                            <div  onClick={() => {alert(
                                                <h5>Prendre contact avec {e.user.username}?</h5>
                                            )}}>
                                                <li key={e.id}>
                                                    <div className="position">
                                                        <h4>{id}</h4>
                                                    </div>
                                                    <div className="description-tag">
                                                        <h3>{e.title}</h3>
                                                        <p>{e.description}</p>
                                                    </div>
                                                </li>
                                            </div>
                                            
                                        );
                                        }
                            )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="map">
                    <Map
                        google={google}
                        zoom={8}
                        initialCenter={
                            {
                                lat: from.lat,
                                lng: from.lng,
                            }
                        }
                    >
                        {issues.map(issue => {
                            return (
                                <Marker
                                    position={{ lat: issue.user.latitude, lng: issue    .user.longitude }}
                                />                            
                            );
                        })}
                    </Map>
                    
                    
                </div>
            </div>
            
        </>
    );
}

export default withRouter(GoogleApiWrapper({
  apiKey: 'AIzaSyDJCMUAVJb_dPak918P_0Bc2h2OEdTJ2nc'
})(Dashboard));



// function Dashboard() {
//  return(   
//     <body >
//         <input placeholder="Recherche" size="50" height="100"> 
//         </input>
//         <div class="overall" width="100%">
//             <div class="issue">
//                 <div class="item">
//                     <div>
//                         <ul>
//                             <li>
//                             <div class="position">
//                                 <h4>1</h4>
//                             </div>
//                             <div class="description-tag">
//                                 <h3>The Grasslands</h3>
//                                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismo.</p>
//                             </div>
                            
//                             </li>

//                             <li>
//                             <div class="position">
//                                 <h4>2</h4>
//                             </div>
//                             <div class="description-tag">
//                                 <h3>Grasslands</h3>
//                                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismo.</p>
//                             </div>
                            
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//                 {/* <script
//                     src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJCMUAVJb_dPak918P_0Bc2h2OEdTJ2nc&callback=initMap&libraries=&v=weekly">
//                 </script> */}
//             {/* <div id="map">
//                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.4740517461346!2d2.387545614872125!3d48.84917010931123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6720d9c7af387%3A0x5891d8d62e8535c7!2sESGI%2C%20%C3%89cole%20Sup%C3%A9rieure%20de%20G%C3%A9nie%20Informatique!5e0!3m2!1sfr!2sfr!4v1646948104898!5m2!1sfr!2sfr"></iframe>
//             </div> */}
//             <script src="../../server/api-map.js"></script>"
//         </div>
        
//     </body>
// );
// }


// export default withRouter(Dashboard);