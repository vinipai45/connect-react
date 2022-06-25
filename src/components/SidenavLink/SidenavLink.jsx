import React from 'react'
import './SidenavLink.scss'

const SidenavLink = ({ className, label, Icon, onClick }) => {

    return (
        <div className={'_sidenav_link ' + className} onClick={onClick}>
            {Icon}
            <h2>{label}</h2>
        </div>
    )
}

export default SidenavLink