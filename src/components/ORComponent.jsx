import React from 'react'
import colors from '../utils/_colors.scss';

const ORComponent = () => {
    return (
        <div style={{ display: "flex" }}>
            <hr
                style={{
                    width: '100%',
                    borderTop: `1px solid ${colors.mediumGrey}`,
                }}
            />

            <span
                style={{
                    margin: '0 30px',
                    color: colors.mediumGrey
                }}
            >OR
            </span>

            <hr
                style={{
                    width: '100%',
                    borderTop: `1px solid ${colors.mediumGrey}`,
                }}
            />
        </div>
    )
}

export default ORComponent