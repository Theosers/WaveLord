import React, { useEffect } from 'react';
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrEmoji } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

import io from 'socket.io-client'
import { add_friend } from '../../store/reducers/chatReducer';
const socket = io('http://localhost:5000')


const Chat = () => {

    const dispatch = useDispatch()
    const {sellerId} = useParams()
    const {userInfo } = useSelector(state => state.auth)
    const {fb_messages,currentFd,my_friends } = useSelector(state => state.chat)

    useEffect(() => {
        socket.emit('add_user',userInfo.id, userInfo)
    },[])

    useEffect(() => {
        dispatch(add_friend({
            sellerId: sellerId || "",
            userId: userInfo.id
        }))
    },[sellerId])
    
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
                      <div>
                          <img src="http://localhost:3000/public/images/user.png" alt="" />
                          <div>
                              <span>weewewewewewewe</span>
                          </div>
                      </div>
        <div>
                <img src="http://localhost:3000/public/images/user.png" alt="" />
                <div >
                    <span>ewwwwwwwww</span>
                </div>
            </div> 
                        </div>
                    </div>
                    <div >
                        <div>
                            <labelhtmlFor=""><AiOutlinePlus /></label>
                            <input type="file" />
                        </div>
                        <div>
                            <input type="text" placeholder='input message'/>
                            <div>
                                <span><GrEmoji /></span>
                            </div>
                        </div>
                        <div>
                            <div>
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
