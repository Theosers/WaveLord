import React from 'react';
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrEmoji } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

import io from 'socket.io-client'
const socket = io('http://localhost:5000')

const Chat = () => {

    const {sellerId} = useParams()
    const {userInfo } = useSelector(state => state.auth)
    
    return (
        <div>
          <div]'>
              <div>
                <span><AiOutlineMessage /></span>
                <span>Message</span>
              </div>
              <div>
                 <Link to='#'>
                  <div>
                    <div></div>
                      <img src="http://localhost:3000/public/images/user.png" alt="" />
                    </div>
                    <span>asdfsd</span>
                </Link> 
            </div>
        <div>
          <div>
            <div>
                <div>
                    <div></div>
                        <img src="http://localhost:3000/public/images/user.png" alt="" />
                    </div>
                    <span>ewewewe</span>
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
        </div>
    </div>
</div>
    );
};

export default Chat;
