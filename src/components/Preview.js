import React, { useEffect } from 'react';
import "./Preview.css";
import {useSelector} from "react-redux";
import {selectCameraImage} from "../features/cameraSlice";
import {useHistory} from "react-router-dom";
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import CloseIcon from "@material-ui/icons/Close";
import {useDispatch} from "react-redux";
import {resetCameraImage} from "../features/cameraSlice";
import { Close, AttachFile, Create, Crop, MusicNote, Note, Timer, TextFields, } from '@material-ui/icons';
import SendIcon from "@material-ui/icons/Send";
import {v4 as uuid} from "uuid";
import {storage,db} from "../firebase/firebase";
import firebase from "firebase";
import { selectUser } from '../features/app/appSlice';


function Preview() {

    const cameraImage = useSelector(selectCameraImage);
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(()=> {
        if(!cameraImage)
        {
            history.replace("/");
        }
    },[cameraImage,history])

    const previewClose = ()=>{
        dispatch(resetCameraImage());
    }

    const sendPost = ()=>{
        const id = uuid();
        const uploadTask = storage.ref(`Posts/${id}`).putString(cameraImage,"data_url");
        uploadTask.on('state_changed',null,(error)=>{
            console.log(error)
        },
        ()=>{
            storage.ref("Posts").child(id).getDownloadURL().then((url)=>{
                db.collection('Posts').add({
                    imageUrl : url,
                    username : "Barath",
                    read : false,
                    profilePic: user.profilePic,
                    timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                });
                history.replace("/chats");
            })
        })
    }
    return (
        <div className="preview">
            <CloseIcon onClick={previewClose} className="preview__close" />
            <div className="preview__toolbarRight">
                <TextFields />
                <Create />
                <Note />
                <MusicNote />
                <AttachFile />
                <Crop />
                <Timer />
            </div>
            <div onClick={sendPost} className="preview__footer">
                <h2>Send Now</h2>
                <SendIcon className="preview__sendIcon" />
            </div>
            <img src={cameraImage} />
        </div>
    )
}
export default Preview;
