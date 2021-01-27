import { Avatar } from '@material-ui/core'
import { ChatBubble, RadioButtonUnchecked, Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Chat from './Chat';
import './Chats.css'
import { selectUser } from './features/appSlice';
import { resetCameraImage } from './features/cameraSlice';
import { auth, db } from './firebase';

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })));
      })
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push('/');

  }

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats__avatar"

        />
        <div className="chats__search">
          <Search className="chats__searchIcon" />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubble className="chats__searchIcon" />
      </div>

      <div className="chats__post">
        {posts.map(({
          id,
          data: {
            profilePic,
            username,
            timestamp,
            imageUrl,
            read
          }
        }) => (
          <Chat
            key={id}
            id={id}
            profilePic={profilePic}
            username={username}
            timestamp={timestamp}
            imageUrl={imageUrl}
            read={read}
          />
        ))}
      </div>

      <RadioButtonUnchecked
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  )
}

export default Chats
