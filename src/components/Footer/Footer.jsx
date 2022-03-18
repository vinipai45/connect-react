import React from 'react'
import CopyrightIcon from '@mui/icons-material/Copyright';

import colors from '../../utils/_colors.scss';
import './Footer.scss'

const Footer = () => {
    return (
        <div className="_footer_main_container" >
            <div
                style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: `${colors.dark}`,
                    marginTop: '17px'
                }}
            >
                <span style={{ marginRight: '20px' }}>India (IN)</span>
                <CopyrightIcon sx={{ fontSize: '24px', verticalAlign: 'middle', mr: 1 }} />
                <span>Connect 2022 from Shambu</span>
            </div>
        </div>
    )
}

export default Footer