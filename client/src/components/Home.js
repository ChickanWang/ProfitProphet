import React, { useEffect, useRef} from 'react';
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import "../App.css";

function Home(){
    const webcamRef = useRef(null);
    
    useEffect(()=>{
        runPosenet();
    }, [])

    const runPosenet = async () => {
        const net = await posenet.load({
          inputResolution: { width: 640, height: 360 },
          scale: 0.5,
        });
        setInterval(() => {
            detect(net);
        }, 15000);
    };
    
    const detect = async (net) =>{
        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState===4){
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            const pose = await net.estimateSinglePose(video);
            console.log(pose);
        }
    }

    return (
        <div>
            <Webcam ref={webcamRef} class="video"/>
        </div>
    )
}

export default Home;