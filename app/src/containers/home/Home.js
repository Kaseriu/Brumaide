import React from "react";
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

function Home() {
    return (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/issue">Issue</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        
    )
}



export default withRouter(Home);