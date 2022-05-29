import React from 'react'
import './SidenavLink.scss'

const SidenavLink = ({ text, Icon }) => {
    return (
        <div className="_sidenav_link">
            <Icon className="_sidenav_icon" />
            <h2>{text}</h2>
        </div>
    )
}

export default SidenavLink