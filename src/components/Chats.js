import React,{useState,useEffect} from 'react';
import "./Chats.css";
import {Avatar} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon  from '@material-ui/icons/ChatBubble';
import { db } from '../firebase/firebase';
import Chat from "./Chat";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { resetImage, selectUser } from '../features/app/appSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from '../features/cameraSlice';



function Chats() {

    const[posts,setPosts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(()=>{
        db.collection("Posts").orderBy('timestamp','desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id : doc.id,
                data : doc.data(),
            })))
        })
    },[])

    const takeSnap = ()=>{
        dispatch(resetCameraImage())
        history.push('/');
      }

    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar className="chats__avatar" src={user.profilePic}
                    onClick={() => {
                    auth.signOut();
                    }} 
                />
                <div className="chats__search">
                    <SearchIcon />
                    <input type="text" placeholder='friends' />
                </div>
                <ChatBubbleIcon className="chats__chatIcon" />
            </div>
            <div className="chats__posts">
                {posts.map(({id,data:{ profilePic,username,timestamp,imageUrl,read}})=>(
                    <Chat
                    key={id}
                    id={id}
                    username={username}
                    timestamp={timestamp}
                    imageUrl={imageUrl}
                    read={read}
                    profilePic={profilePic}
                  />
                ))}
            </div>
            <RadioButtonUncheckedIcon
                className="chats__takepicicon"
                onClick={takeSnap}
                fontSize="large"
            />

        </div>
    )
}

export default Chats
