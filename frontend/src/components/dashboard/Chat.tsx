import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrEmoji } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

import io from 'socket.io-client'
import {FaList} from 'react-icons/fa'
import { add_friend, messageClear, send_message,updateMessage } from '../../store/reducers/chatReducer';
import toast from 'react-hot-toast';
const socket = io('http://localhost:5000')


const Chat = () => {

    const scrollRef = useRef()

    const dispatch = useDispatch()
    const {sellerId} = useParams()
    const {userInfo } = useSelector(state => state.auth)
    const {fb_messages,currentFd,my_friends,successMessage } = useSelector(state => state.chat)
    const [text,setText] = useState('')
    const [receverMessage,setReceverMessage] = useState('')
    const [activeSeller,setActiveSeller] = useState([])
    const [show, setShow] = useState(false)
    
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

    useEffect(() => {
        socket.on('seller_message', msg => {
            setReceverMessage(msg)
        })
        socket.on('activeSeller', (sellers) => {
            setActiveSeller(sellers)
        })
    },[])    

    useEffect(() => {
        if (successMessage) {
            socket.emit('send_customer_message',fb_messages[fb_messages.length - 1])
            dispatch(messageClear())
        }
    },[successMessage])

    useEffect(() => {
        if (receverMessage) {
            if (sellerId === receverMessage.senderId && userInfo.id === receverMessage.receverId) {
                dispatch(updateMessage(receverMessage))
            } else {
                toast.success(receverMessage.senderName + " " + "Send A message")
                dispatch(messageClear())
            }
        }

    },[receverMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth'})
    },[fb_messages])
    
    return (
        <div>
          <div>
              <div className={`a ${show ? 'b' : 'c'}`}>
                <span><AiOutlineMessage /></span>
                <span>Message</span>
              </div>
              <div>


                  {
                    my_friends.map((f,i) => <Link to={`/dashboard/chat/${f.fdId}`} key={i}>
                    <div>    
                        {
                        activeSeller.some(c => c.sellerId === f.fdId ) && <div>test_active_Seller</div> 
                       } 
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
                        <div>
                            {
                            activeSeller.some(c => c.sellerId === currentFd.fdId) && <div>test_active_Seller</div>
                            }                    
                            <img src={currentFd.image} alt="" />
                            </div>
                        <span>{currentFd.name}</span>

                        </div> 

                        <div onClick={()=> setShow(!show)}>
                            <FaList/>
                        </div>      
                    
                      </div>
                  <div>
                    <div>
                        {
                            fb_messages.map((m, i) => {
                                if (currentFd?.fdId !== m.receverId) {
                                    return(
                                              <div ref={scrollRef} key={i}>
                                                  <img src="http://localhost:3000/public/images/user.png" alt="" />
                                                  <div>
                                                    <span>{m.message}</span>
                                                  </div>
                                              </div>
                                        )
                                        }else{ 
                                          return (
                                                    <div ref={scrollRef} key={i}>
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
                </div> : <div onClick={() => setShow(true)}>
                    <span>select seller</span>
                </div>
           }
        </div>
    </div>
</div>
    );
};

export default Chat;
