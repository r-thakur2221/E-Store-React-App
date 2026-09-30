import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import GroupsIcon from '@mui/icons-material/Groups';
import MessageIcon from '@mui/icons-material/Message';
import EventNoteIcon from '@mui/icons-material/EventNote';


export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard/rahul',
    icon: <DashboardIcon/>,
  },
  {
    title: 'Notes',
    path: '/notes',
    icon: <EventNoteIcon />,
  },
  {
    title: 'Search',
    path: '/search',
    icon: <SearchIcon />,
  },
  {
    title: 'Category',
    path: '/category',
    icon: <CategoryIcon />,
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <MessageIcon />,
  },
  {
    title: 'Support',
    path: '/support',
    icon: <GroupsIcon />,
  }
];