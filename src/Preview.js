import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Preview.css'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import { useHistory } from 'react-router-dom';
import { AttachFile, Close, Create, Crop, MusicNote, Note, Send, TextFields, Timer } from '@material-ui/icons';

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  }

  return (
    <div className="preview">
      <Close onClick={closePreview} className="preview__close" />
      <div className="preview__toolbar_right">
        <TextFields />
        <Create />
        <Note />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />
      </div>
      <img src={cameraImage} alt="" />
      <div className="preview__footer">
        <h2>Send Now</h2>
        <Send fontSize="small" className="preview__sendIcon"/>
      </div>
    </div>
  )
}

export default Preview
