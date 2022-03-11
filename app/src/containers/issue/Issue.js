import React, {useState,useEffect} from "react";
import {withRouter} from 'react-router';
import './Issue.css';

function Issue() {
    const [data, setData] = useState([]);
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [Tags, setTags] = useState(1);
    const [modify, setModify] = useState(1);

    useEffect(() =>{
        if(modify !== 1){
            const issue = {title: title, description: description, tags: Tags,ownerId: 1,priority:3,statusId:4}
            console.log(issue);
            fetch('http://10.33.5.57:3001/api/v1/issues',{
                method:'POST',
                body: JSON.stringify(issue),
                headers: {'Content-Type': 'application/json'}
            }).then(async(res)=>{
                const json = await res.json();
                setData(json)
            }).catch(err=>{
                console.log(err.message);
            })
            setModify(1);
        }
    });

    return(
        <div class="issue">
            <div class="center">
                <form>
                    <div class="txt_field">
                        <input id="Title" onChange={e => setTitle(e.target.value)} type="text" required/>
                        <span></span>
                        <label>Description</label>
                    </div>
                    <div class="issue-text">
                        <textarea id="issue-text" onChange={e => setDescription(e.target.value)} placeholder="Explain with details your issue" name="issue-text"></textarea>
                    </div>
                    <div class="txt_field">
                        <input id="Tags" onChange={e => setTags(e.target.value)}  type="text" required/>
                        <span></span>
                        <label>Tags</label>
                    </div>
                    
                    <input type="submit" value="Submit" onClick={() => setModify(0)}/>
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