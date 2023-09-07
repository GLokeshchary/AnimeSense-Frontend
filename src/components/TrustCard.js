import React from 'react'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import RingVolumeOutlinedIcon from '@mui/icons-material/RingVolumeOutlined';
import "./TrustCard.css"

function TrustCard() {
  return (
    <div className='trust'>
        <div className='t-left'>
            <div className='t-icon'><LocalShippingOutlinedIcon/></div>
            <div className='t-text'>
                <div className='Header-t'>FREE SHIPPING & RETURN</div>
                <div className='context-t'>We provide free shipping all over India and hassles 10 days return.</div>
            </div>
        </div>
        <hr/>
        <div className='t-left'>
        <div className='t-icon'><StarOutlineOutlinedIcon className='t-icon'/></div>
            <div className='t-text'>
            <div className='Header-t'>Assured Premium Quality</div>
                <div className='context-t'>Loved by more than 1 lakh+ Otaku's and counting.</div>
            </div>
        </div>
        <hr/>
        <div className='t-left'>
        <div className='t-icon'><RingVolumeOutlinedIcon/></div>
            <div className='t-text'>
            <div className='Header-t'>Full Customer Support</div>
                <div className='context-t'>Our passionate team is available to resolve your query.</div>
            </div>
        </div>

    </div>
  )
}

export default TrustCard