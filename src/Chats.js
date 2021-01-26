import { Avatar } from '@material-ui/core'
import { ChatBubble, Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import Chat from './Chat';
import './Chats.css'
import { db } from './firebase';

function Chats() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })));
        console.log(posts);
      })
  }, [])

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar className="chats__avatar" />
        <div className="chats__search">
          <Search />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubble />
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
    </div>
  )
}

export default Chats
