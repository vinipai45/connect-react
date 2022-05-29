import React, { useState } from 'react'

import SidenavLink from '../SidenavLink/SidenavLink'
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import './Sidenav.scss'

const Sidenav = () => {

    const [activeLink, setActiveLink] = useState("home")

    return (
        <div className='_sidenav'>
            <SidenavLink key="home" text="Home" Icon={HomeIcon} />
            <SidenavLink key="explore" text="Explore" Icon={TagIcon} />
            <SidenavLink key="notifications" text="Notifications" Icon={NotificationsNoneIcon} />
            <SidenavLink key="messages" text="Messages" Icon={ChatBubbleOutlineIcon} />
            <SidenavLink key="bookmarks" text="Bookmarks" Icon={BookmarkBorderIcon} />
            <SidenavLink key="lists" text="Lists" Icon={FormatListBulletedIcon} />
            <SidenavLink key="profile" text="Profile" Icon={PermIdentityIcon} />
            <SidenavLink key="more" text="More" Icon={MoreHorizIcon} />
        </div>
    )
}

export default Sidenav