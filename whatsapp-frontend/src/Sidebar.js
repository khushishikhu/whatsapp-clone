import React from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import {Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';

function sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src='https://avatars2.githubusercontent.com/u/65439761?s=400&u=25c135329b09ecbdb3ddf74f269ac32123f25031&v=4'/>
                <div className="sidebar_headerright">
                    <IconButton>
                    <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                     <ChatIcon />
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <SearchOutlined/>
                    <input type='text' placeholder='Search or Start new chat'/>
                </div>
            </div>

            <div className='sidebar_chat'>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>

            </div>
        </div>
    )
}

export default sidebar
