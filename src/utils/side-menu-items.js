import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

import '../components/SidenavLink/SidenavLink.scss'

const sideMenuItems = [
    {
        label: "Home",
        key: "home",
        icon: <HomeIcon className="_sidenav_icon" />
    },
    {
        label: "Search",
        key: "search",
        icon: <SearchIcon className="_sidenav_icon" />
    },
    {
        label: "Notifications",
        key: "notifications",
        icon: <NotificationsNoneIcon className="_sidenav_icon" />
    },
    {
        label: "Messages",
        key: "messages",
        icon: <ChatBubbleOutlineIcon className="_sidenav_icon" />
    },
    {
        label: "Bookmarks",
        key: "bookmarks",
        icon: <BookmarkBorderIcon className="_sidenav_icon" />
    },
    {
        label: "Lists",
        key: "lists",
        icon: <FormatListBulletedIcon className="_sidenav_icon" />
    },
    {
        label: "Profile",
        key: "profile",
        icon: <PermIdentityIcon className="_sidenav_icon" />
    },
    {
        label: "More",
        key: "more",
        icon: <MoreHorizIcon className="_sidenav_icon" />
    },
]

const bottomNavItems = [
    {
        label: "Home",
        key: "home",
        icon: <IconButton size="large">
            <HomeIcon className="_bottom_nav_icon" />
        </IconButton>
    },
    {
        label: "Search",
        key: "search",
        icon: <IconButton size="large">
            <SearchIcon className="_bottom_nav_icon" />
        </IconButton>
    },
    // {
    //     label: "Notifications",
    //     key: "notifications",
    //     icon: <IconButton size="large">
    //         <NotificationsNoneIcon className="_bottom_nav_icon" />
    //     </IconButton>
    // },
    {
        label: "Messages",
        key: "messages",
        icon: <IconButton size="large">
            <ChatBubbleOutlineIcon className="_bottom_nav_icon" />
        </IconButton>
    },
    // {
    //     label: "Bookmarks",
    //     key: "bookmarks",
    //     icon: <BookmarkBorderIcon className="_bottom_nav_icon" />
    // },
    // {
    //     label: "Lists",
    //     key: "lists",
    //     icon: <FormatListBulletedIcon className="_bottom_nav_icon" />
    // },
    {
        label: "Profile",
        key: "profile",
        icon: <IconButton size="large">
            <PermIdentityIcon className="_bottom_nav_icon" />
        </IconButton>
    },
    // {
    //     label: "More",
    //     key: "more",
    //     icon: <MoreHorizIcon className="_bottom_nav_icon" />
    // },
]

export { sideMenuItems, bottomNavItems }