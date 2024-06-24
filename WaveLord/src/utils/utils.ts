import { io, Socket } from 'socket.io-client';

export const overrideStyle: React.CSSProperties = {
    display: 'flex',
    margin: '0 auto',
    height: '24px',
    justifyContent: 'center',
    alignItems: 'center'
};

export const socket: Socket = io('http://localhost:5000');
