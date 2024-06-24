import { AiOutlineDashboard, AiOutlineShopping } from 'react-icons/ai';
import { BiSolidCategory } from 'react-icons/bi';
import { BsCartCheck, BsFillChatQuoteFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaUserTimes, FaUsers } from 'react-icons/fa';
import { FaCodePullRequest } from 'react-icons/fa6';
import { IoIosChatbubbles, IoMdAdd } from 'react-icons/io';
import { IoChatbubbles } from 'react-icons/io5';
import { MdPayment, MdViewList } from 'react-icons/md';
import { TbBasketDiscount } from 'react-icons/tb';
import React from 'react';

interface NavItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  role: string;
  path: string;
}

export const allNav: NavItem[] = [
  {
    id: 1,
    title: 'Dashboard',
    icon: <AiOutlineDashboard color='orange' />,
    role: 'admin',
    path: '/admin/dashboard',
  },
  {
    id: 2,
    title: 'Orders',
    icon: <AiOutlineShopping color='orange' />,
    role: 'admin',
    path: '/admin/dashboard/orders',
  },
  {
    id: 3,
    title: 'Category',
    icon: <BiSolidCategory color='orange' />,
    role: 'admin',
    path: '/admin/dashboard/category',
  },
  {
    id: 4,
    title: 'Sellers',
    icon: <FaUsers color='orange' />,
    role: 'admin',
    path: '/admin/dashboard/sellers',
  },
  {
    id: 5,
    title: 'Payment Request',
    icon: <MdPayment color='orange' />,
    role: 'admin',
    path: '/admin/dashboard/payment-request',
  },
  {
    id: 6,
    title: 'Deactive Sellers',
    icon: <FaUserTimes color='orange' />,
    role: 'admin',
    path: '/admin/dashboard/deactive-sellers',
  },
  {
    id: 7,
    title: 'Seller Request',
    icon: <FaCodePullRequest color='orange' />,
    role: 'admin',
    path: '/admin/dashboard/sellers-request',
  },
  {
    id: 8,
    title: 'Live Chat',
    icon: <IoIosChatbubbles color='orange' />,
    role: 'admin',
    path: '/admin/dashboard/chat-sellers',
  },
  {
    id: 9,
    title: 'Dashboard',
    icon: <AiOutlineDashboard color='orange' />,
    role: 'seller',
    path: '/seller/dashboard',
  },
  {
    id: 10,
    title: 'Add Product',
    icon: <IoMdAdd color='orange' />,
    role: 'seller',
    path: '/seller/dashboard/add-product',
  },
  {
    id: 11,
    title: 'All Product',
    icon: <MdViewList color='orange' />,
    role: 'seller',
    path: '/seller/dashboard/products',
  },
  {
    id: 12,
    title: 'Discount Product',
    icon: <TbBasketDiscount color='orange' />,
    role: 'seller',
    path: '/seller/dashboard/discount-product',
  },
  {
    id: 13,
    title: 'Orders',
    icon: <BsCartCheck color='orange' />,
    role: 'seller',
    path: '/seller/dashboard/orders',
  },
  {
    id: 14,
    title: 'Payments',
    icon: <MdPayment color='orange' />,
    role: 'seller',
    path: '/seller/dashboard/payments',
  },
  {
    id: 15,
    title: 'Chat-Customer',
    icon: <IoChatbubbles color='orange' />,
    role: 'seller',
    path: '/seller/dashboard/chat-customer',
  },
  {
    id: 16,
    title: 'Chat-Support',
    icon: <BsFillChatQuoteFill color='orange' />,
    role: 'seller',
    path: '/seller/dashboard/chat-support',
  },
  {
    id: 17,
    title: 'Profile',
    icon: <CgProfile color='orange' />,
    role: 'seller',
    path: '/seller/dashboard/profile',
  },
];
