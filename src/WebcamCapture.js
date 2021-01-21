import { RadioButtonUnchecked } from '@material-ui/icons';
import React, { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
import './WebcamCapture.css';
import { setCameraImage } from './features/cameraSlice';
import { useHistory } from 'react-router-dom';

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
}

function WebcamCapture() {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const capture = useCallback(() => {
    const imageSource = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSource));
    history.push('/preview');
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

      <RadioButtonUnchecked
        className="webcamCapture__button"
        onClick={capture}
        fontSize="large"
      />
    </div>
  )
}

export default WebcamCapture;