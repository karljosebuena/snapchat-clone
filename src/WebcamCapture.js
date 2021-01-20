import { RadioButtonChecked } from '@material-ui/icons';
import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './WebcamCapture.css';

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
}

function WebcamCapture() {
  const webcamRef = useRef(null);

  const [image, setImage] = useState(null);

  const capture = useCallback(() => {
    const imageSource = webcamRef.current.getScreenshot();
    // setImage(imageSource);
  }, [webcamRef]);

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        width={videoConstraints.width}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />

      <RadioButtonChecked
        className="webcamCapture__button"
        onClick={capture}
        fontSize="large"
      />
    </div>
  )
}

export default WebcamCapture;