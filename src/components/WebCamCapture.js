/*import React,{useRef,useCallback} from 'react';
import WebCam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked"


const videoConstraints = {
    width : 250,
    height:400,
    facingMode : "user",
}


function WebCamCapture() {

    const webcamRef =  useRef(null);

    const capture = useCallback(() => {
        const imageSource = webcamRef.current.getScreenshot();
        console.log(imageSource);
      }, [webcamRef])


    return (
        <div className= "webCamCapture">
            <WebCam 
                audio = {false}
                height = {videoConstraints.height}
                ref={WebCam.ref}
                screenshotFormat = "image/jpeg"
                width = {videoConstraints.width}
                videoConstraints={videoConstraints}
            />
            <RadioButtonUncheckedIcon className="webcamCapture__button" onClick={capture} />
        </div>
    )
}

export default WebCamCapture
*/



import React, {useState, useRef, useCallback } from 'react';
import "./WebCamCapture.css";
import Webcam from 'react-webcam';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import {useDispatch} from "react-redux";
import {setCameraImage} from "../features/cameraSlice";
import {useHistory} from "react-router-dom";



const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
}

export default function WebcamCapture() {

  const webcamRef = useRef(null);
  const[image,setImage] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();


  const capture = useCallback(() => {
    const imageSource = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSource));
    history.push("/preview")
  }, [webcamRef])


  return (
    <div className="webCamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />
      <RadioButtonUnchecked
        className="webcamCapture__button"
        onClick={capture}
        fontSize="large"
      />
      <img src={image} alt="" />
    </div>
  )
}