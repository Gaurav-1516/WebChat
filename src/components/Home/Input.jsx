import React, { useContext, useState } from 'react'
import {BiImageAdd,BiSend} from 'react-icons/bi'
import {MdAttachFile} from 'react-icons/md'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function Input() {
  const [text,setText] = useState("");
  const [img,setImg] = useState(null);
  // const [file,setFile] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="input">
      <input type='text' placeholder='Message your friend...' onChange={(e)=>setText(e.target.value)} value={text}/>
      <div className="send">
        <input type="file" style={{display:'none'}} id="file" onChange={(e)=>setImg(e.target.files[0])}/>
        <label htmlFor="file">
          <BiImageAdd size={25}/>
        </label>
        {/* <input type="file" style={{display:'none'}} id='file' onChange={(e)=>setFile(e.target.files[0])}/>
        <label htmlFor="file">
          <MdAttachFile size={25}/>
        </label> */}
        <button onClick={handleSend}>
          <BiSend size={25}/>
        </button>
      </div>
    </div>
  )
}

export default Input