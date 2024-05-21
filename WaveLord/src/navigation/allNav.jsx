import { AiOutlineDashboard, AiOutlineShopping } from 'react-icons/ai';
import { BiSolidCategory } from 'react-icons/bi';
import { FaUserTimes, FaUsers } from 'react-icons/fa';
import { FaCodePullRequest } from 'react-icons/fa6';
import { IoIosChatbubbles } from 'react-icons/io';
import { MdPayment } from 'react-icons/md';

export const allNav = [
    {
        id : 1,
        title : 'Dashboard',
        icon : <AiOutlineDashboard color='orange'/>,
        role : 'admin',
        path : '/admin/dashboard'
    }
    ,
    {
        id : 2,
        title : 'Orders',
        icon : <AiOutlineShopping color='orange'/>,
        role : 'admin',
        path : '/admin/dashboard/orders'
    },
    {
        id : 3,
        title : 'Category',
        icon : <BiSolidCategory color='orange'/>,
        role : 'admin',
        path : '/admin/dashboard/category'
    },
    {
        id : 4,
        title : 'Sellers',
        icon : <FaUsers color='orange'/>,
        role : 'admin',
        path : '/admin/dashboard/sellers'
    },
    {
        id : 5,
        title : 'Payment Request',
        icon : <MdPayment color='orange'/>,
        role : 'admin',
        path : '/admin/dashboard/payment-request'
    },
    {
        id : 6,
        title : 'Deactive Sellers',
        icon : <FaUserTimes color='orange'/>,
        role : 'admin',
        path : '/admin/dashboard/deactive-sellers'
    },
    {
        id : 7,
        title : 'Seller Request',
        icon : <FaCodePullRequest color='orange'/>,
        role : 'admin',
        path : '/admin/dashboard/sellers-request'
    },
    {
        id : 8,
        title : 'Live Chat',
        icon : <IoIosChatbubbles color='orange'/>,
        role : 'admin',
        path : '/admin/dashboard/chat-seller'
    },
]