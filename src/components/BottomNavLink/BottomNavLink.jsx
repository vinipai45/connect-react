import React from 'react'
import './BottomNavLink.scss'

const BottomNavLink = ({ Icon, label, className, onClick }) => {
    return (
        <div className={'_bottom_nav_link ' + className} onClick={onClick}>
            {Icon}
            <h2>{label}</h2>
        </div>
    )
}

export default BottomNavLink