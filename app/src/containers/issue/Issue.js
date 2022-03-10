import React from "react";
import {withRouter} from 'react-router';
import './Issue.css';

function Issue() {
    return(
        <div class="issue">
            <div class="center">
                <form method="post">
                    <div class="txt_field">
                        <input type="text" required/>
                        <span></span>
                        <label>Description</label>
                    </div>
                    <div class="issue-text">
                        <textarea id="issue-text" name="issue-text"> Explain with details your issue</textarea>
                    </div>
                    <div class="txt_field">
                        <input type="text" required/>
                        <span></span>
                        <label>Tags</label>
                    </div>
                    
                    <input type="submit" value="Submit" onClick={() => console.log("click")}/>
                </form>
                </div>

                {/* <ul>
                    <label class="input-description">
                        <input class="input-description" type="text" placeholder="Give a short description of your issue" />
                    </label>
                    <div class="issue-text">
                        <textarea id="issue-text" name="issue-text"></textarea>
                    </div>
                    <div class="tags">
                        <input type="text" id="tags" name="tags" placeholder="Tags"/>
                    </div>
                    <button onClick={console.log("validate")}>

                    </button>
                </ul> */}
        </div>
    );
}

export default withRouter(Issue);