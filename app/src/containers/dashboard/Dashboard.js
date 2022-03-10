import React from "react";
import {withRouter} from 'react-router';
import "./Dashboard.css"

function Dashboard() {

 return(   
    <body >
        <input placeholder="Recherche" size="50" height="50"/>
        <div width="100%">
            <div class="issue">
                <div class="item">
                <div>
                    <ul>
                        <li>
                        <div class="position">
                            <h4>1</h4>
                        </div>
                        <div class="description-tag">
                            <h3>The Grasslands</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismo.</p>
                        </div>
                        
                        </li>
                    </ul>
                </div>
                    {/* <div class="position">
                        <h4>1</h4>
                    </div>
                    <div class="description-tag">
                        <div class="description">
                            <h4>Example 1</h4>
                        </div>
                        <div class="tag">
                            <h1>Tag 1</h1>
                        </div>     */}
                </div>
                {/* <div class="item">
                    <div class="position">
                            <h4>2</h4>
                        </div>
                        <div class="description">
                            <h4>Example 1</h4>
                        </div>

                        <div class="tag">
                            <h1>Tag 1</h1>
                        </div>
                    </div> */}
            </div>
            <div id="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.4740517461346!2d2.387545614872125!3d48.84917010931123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6720d9c7af387%3A0x5891d8d62e8535c7!2sESGI%2C%20%C3%89cole%20Sup%C3%A9rieure%20de%20G%C3%A9nie%20Informatique!5e0!3m2!1sfr!2sfr!4v1646948104898!5m2!1sfr!2sfr"></iframe>
            </div>
        </div>
        

        
    </body>
);
}


export default withRouter(Dashboard);