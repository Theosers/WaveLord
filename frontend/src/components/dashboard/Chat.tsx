import React, { useEffect, useState } from 'react';
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrEmoji } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

import io from 'socket.io-client'
import { add_friend, send_message } from '../../store/reducers/chatReducer';
const socket = io('http://localhost:5000')


const Chat = () => {

    const dispatch = useDispatch()
    const {sellerId} = useParams()
    const {userInfo } = useSelector(state => state.auth)
    const {fb_messages,currentFd,my_friends,successMessage } = useSelector(state => state.chat)
    const [text,setText] = useState('')
    
    useEffect(() => {
        socket.emit('add_user',userInfo.id, userInfo)
    },[])

    useEffect(() => {
        dispatch(add_friend({
            sellerId: sellerId || "",
            userId: userInfo.id
        }))
    },[sellerId])

    const send = () => {
        if (text) {
            dispatch(send_message({
                userId: userInfo.id,
                text,
                sellerId,
                name: userInfo.name 
            }))
            setText('')
        }
    }
    
    return (
        <div>
          <div]'>
              <div>
                <span><AiOutlineMessage /></span>
                <span>Message</span>
              </div>
              <div>


                  {
                    my_friends.map((f,i) => <Link to={`/dashboard/chat/${f.fdId}`} key={i}>
                    <div>    
                        <img src={f.image} alt="" />
                    </div>
                    <span>{f.name}</span>
                </Link> )
               }

                  
                  
            </div>
        <div>
           {
                currentFd ? <div>
                <div>
                    <div>
                    
                        <img src={currentFd.image} alt="" />
                    </div>
                    <span>{currentFd.name}</span>
                  </div>
                  <div>
                    <div>
                        {
                            fb_messages.map((m, i) => {
                                if (currentFd?.fdId !== m.receverId) {
                                    return(
                                              <div key={i}>
                                                  <img src="http://localhost:3000/public/images/user.png" alt="" />
                                                  <div>
                                                    <span>{m.message}</span>
                                                  </div>
                                              </div>
                                        )
                                        }else{ 
                                          return (
                                                    <div key={i}>
                                                            <img src="http://localhost:3000/public/images/user.png" alt="" />
                                                            <div >
                                                                <span>{m.message}</span>
                                                            </div>
                                                        </div> 
                                                          )     
                                                            }
                                                        })
                                                    }
                        </div>
                    </div>
                    <div >
                        <div>
                            <labelhtmlFor=""><AiOutlinePlus /></label>
                            <input type="file" />
                        </div>
                        <div>
                            <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder='input message'/>
                            <div>
                                <span><GrEmoji /></span>
                            </div>
                        </div>
                        <div>
                            <div onClick={send}>
                                <IoSend />
                            </div>
                        </div>
                    </div>
                </div> : <div>
                    <span>select seller</span>
                </div>
           }
        </div>
    </div>
</div>
    );
};

export default Chat;
