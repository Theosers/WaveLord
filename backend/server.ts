import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { dbConnect } from './utilities/db';
import socketIO, { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';

import homeRoutes from './routes/home/homeRoutes';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/order/orderRoutes';
import cardRoutes from './routes/home/cardRoutes';
import categoryRoutes from './routes/dashboard/categoryRoutes';
import productRoutes from './routes/dashboard/productRoutes';
import sellerRoutes from './routes/dashboard/sellerRoutes';
import customerAuthRoutes from './routes/home/customerAuthRoutes';
import chatRoutes from './routes/chatRoutes';
import paymentRoutes from './routes/paymentRoutes';
import dashboardRoutes from './routes/dashboard/dashboardRoutes';


dotenv.config();

const app = express();
const server = http.createServer(app);

interface User {
  customerId?: string;
  sellerId?: string;
  socketId: string;
  userInfo: any;
}

let allCustomer: User[] = [];
let allSeller: User[] = [];
let admin: User = { socketId: '', userInfo: {} };

const io: SocketIOServer = new socketIO.Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  },
});

const addUser = (customerId: string, socketId: string, userInfo: any) => {
  const checkUser = allCustomer.some(u => u.customerId === customerId);
  if (!checkUser) {
    allCustomer.push({ customerId, socketId, userInfo });
  }
};

const addSeller = (sellerId: string, socketId: string, userInfo: any) => {
  const checkSeller = allSeller.some(u => u.sellerId === sellerId);
  if (!checkSeller) {
    allSeller.push({ sellerId, socketId, userInfo });
  }
};

const findCustomer = (customerId: string) => {
  return allCustomer.find(c => c.customerId === customerId);
};

const findSeller = (sellerId: string) => {
  return allSeller.find(c => c.sellerId === sellerId);
};

const remove = (socketId: string) => {
  allCustomer = allCustomer.filter(c => c.socketId !== socketId);
};

io.on('connection', (soc: Socket) => {
  console.log('socket server running..');

  soc.on('add_seller', (sellerId: string, userInfo: any) => {
    addSeller(sellerId, soc.id, userInfo);
    io.emit('activeSeller', allSeller);
  });

  soc.on('add_user', (customerId: string, userInfo: any) => {
    addUser(customerId, soc.id, userInfo);
    io.emit('activeSeller', allSeller);
  });

  soc.on('send_seller_message', (msg: any) => {
    const customer = findCustomer(msg.receverId);
    if (customer) {
      soc.to(customer.socketId).emit('seller_message', msg);
    }
  });

  soc.on('send_customer_message', (msg: any) => {
    const seller = findSeller(msg.receverId);
    if (seller) {
      soc.to(seller.socketId).emit('customer_message', msg);
    }
  });

  soc.on('send_message_admin_to_seller', (msg: any) => {
    const seller = findSeller(msg.receverId);
    if (seller) {
      soc.to(seller.socketId).emit('receved_admin_message', msg);
    }
  });

  soc.on('send_message_seller_to_admin', (msg: any) => {
    if (admin.socketId) {
      soc.to(admin.socketId).emit('receved_seller_message', msg);
    }
  });


  soc.on('add_admin', (adminInfo: any) => {
    if (adminInfo && typeof adminInfo === 'object') {
      delete adminInfo.email;
      delete adminInfo.password;
      admin = adminInfo;
      //admin.socketId = soc.id;
      io.emit('activeSeller', allSeller);
    } else {
      console.error('Received invalid adminInfo:', adminInfo);
    }
  });
  

  soc.on('disconnect', () => {
    console.log('user disconnect');
    remove(soc.id);
    io.emit('activeSeller', allSeller);
  });
});

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());
dbConnect();

app.use('/api/home', homeRoutes);
app.use('/api', authRoutes);
app.use('/api', orderRoutes);
app.use('/api',cardRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', sellerRoutes);
app.use('/api', customerAuthRoutes);
app.use('/api', chatRoutes);
app.use('/api', paymentRoutes);
app.use('/api', dashboardRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from my server!');
});

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server is running on port ${port}`));
