import React from 'react';
import "./Chat.css";
import {Avatar} from '@material-ui/core';
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import ReactTimeago from "react-timeago";
import { useDispatch } from 'react-redux';
import {useHistory} from "react-router-dom";
import {selectImage} from "../features/app/appSlice";
import {db} from "../firebase/firebase";

function Chat({ id, profilePic, username, timestamp, imageUrl, read }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const open = ()=> {
        if(!read){
            dispatch(selectImage(imageUrl));
            db.collection("Posts").doc(id).set({
                read : true,   
            },
            {merge : true}
            );
            history.replace("/chats/view");
        }
    }
    return (
        <div onClick={open} className="chat">
            <Avatar src={profilePic} className="chat__avatar" />
            <div className="chat__info">
                <h4>{username}</h4>
                {!read && "Tap to View - "}{" "}
                <ReactTimeago date= {new Date(timestamp?.toDate()).toUTCString()} />
            </div>
            {!read && <StopRoundedIcon className="chat__readIcon"  />}
        </div>
    )
}

export default Chat
