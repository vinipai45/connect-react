import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import '../components/SidenavLink/SidenavLink.scss'

const sideMenuItems = [
    {
        label: "Home",
        key: "home",
        icon: <HomeIcon className="_sidenav_icon" />
    },
    {
        label: "Explore",
        key: "explore",
        icon: <TagIcon className="_sidenav_icon" />
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

export { sideMenuItems }