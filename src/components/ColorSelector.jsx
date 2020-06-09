import React, { useState } from 'react'

import { TooltipLarge } from './Tooltips.jsx'

import Theme from './Theme'

const ColorPicker = () => {
  const HueSlider = () => (
    <div style={{
      marginTop: 15,
      display: 'flex',
      background: 'linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))',
      height: 25,
      alignItems: 'center',
      borderRadius: 6
    }}>
      <div style={{
        marginLeft: '40%',
      }}>
        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#pickerHandleDropShadow)">
            <circle cx="11" cy="10.5" r="8.5" stroke="white" strokeWidth="2" />
          </g>
          <defs>
            <filter id="pickerHandleDropShadow" x="0.5" y="0" width="21" height="21" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.66 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>)

  return (
    <div>
      <div style={{
        ...Theme.getFont(16),
        marginBottom: 11
      }}>Color</div>
      <div>
        <svg width="207" height="180" viewBox="0 0 207 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" width="206" height="180" rx="6" fill="white" />
          <rect x="0.5" width="206" height="180" rx="6" fill="url(#paint0_linear)" />
          <rect x="0.5" width="206" height="180" rx="6" fill="url(#paint1_linear)" />
          <g filter="url(#filter1_d)">
            <circle cx="147.5" cy="38" r="10" stroke="white" strokeWidth="2" />
          </g>
          <defs>
            <filter id="filter1_d" x="135.5" y="26" width="24" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.66 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
            <linearGradient id="paint0_linear" x1="184.975" y1="90" x2="-53.7723" y2="96.6754" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF0000" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear" x1="103.5" y1="0" x2="103.5" y2="180" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <HueSlider />
      <div style={{ display: 'flex', ...Theme.getFont(14), alignItems: 'center', marginTop: 22, marginRight: 4 }}>
        <div>HEX</div>
        <div style={{ marginLeft: 12, borderBottom: `1px solid ${Theme.separatorColor0}` }}>#3ACA4E</div>
        <div style={{ flexGrow: 4 }}></div>
        <div >
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.12876 18.8949C1.94724 19.6739 3.72186 19.1456 5.17236 17.69L12.0081 10.83L12.5337 11.3323C12.9357 11.7155 13.5787 11.7108 13.9675 11.3195C14.3582 10.929 14.3462 10.3007 13.9439 9.91651L13.1749 9.18279L16.838 5.50578C17.4868 4.85406 17.4692 3.80707 16.7987 3.16743C16.127 2.52642 15.0573 2.53619 14.4093 3.18723L10.7449 6.86458L9.97518 6.12998C9.57208 5.74601 8.93108 5.75201 8.54053 6.14174C8.15082 6.53334 8.16218 7.16148 8.56552 7.54626L9.09103 8.04765L2.25559 14.908C0.805737 16.3633 0.310048 18.1138 1.12876 18.8949ZM9.57691 8.51127L11.5218 10.3658L4.68629 17.2264C3.44052 18.477 2.06015 18.8606 1.59933 18.4223C1.13929 17.9829 1.49577 16.6222 2.74166 15.3709L9.57691 8.51127Z" fill="#B9B9B9" />
          </svg>
        </div>
      </div>
      <div style={{ display: 'flex', ...Theme.getFont(14), alignItems: 'center', marginTop: 27, marginRight: 4 }}>
        <div>
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 1.5L5.5 5.5L1.5 9.5" stroke="#B9B9B9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ flexGrow: 4, marginLeft: 18 }}>HSB</div>
        <div >
          <svg width="17" height="4" viewBox="0 0 17 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.5" cy="2" r="2" fill="#C4C4C4" />
            <circle cx="8.5" cy="2" r="2" fill="#C4C4C4" />
            <circle cx="14.5" cy="2" r="2" fill="#C4C4C4" />
          </svg>
        </div>
      </div>
    </div>
  )
}

const ColorSelector = ({ backgroundColor, foregroundColor, isBackgroundActive }) => {
  console.log(backgroundColor)
  const highlightedColor = '#427EE3'
  const strokeColor = '#5A5A5A'

  const getStrokeProps = (active) =>
    active ? {
      r: 14, stroke: highlightedColor, strokeWidth: 2
    } : {
        r: 14.5, stroke: strokeColor
      }
  const TopColorSwatch = () => (<g>
    <circle cx="15" cy="15" r="15" fill={Theme.panelColor} />
    <circle cx="15" cy="15" r="11" fill={foregroundColor} />
    {React.createElement('circle', { cx: 15, cy: 15, ...getStrokeProps(!isBackgroundActive) })}
  </g>)

  const BottomColorSwatch = () => (<g>
    <circle cx="15" cy="33" r="15" fill={Theme.panelColor} />
    <circle cx="15" cy="33" r="11" fill={backgroundColor} />
    {React.createElement('circle', { cx: 15, cy: 33, ...getStrokeProps(isBackgroundActive) })}
  </g>)

  const [clicked, setClicked] = useState(false)

  return (<div onClick={() => setClicked(!clicked)} style={{
    position: 'relative',
    marginTop: '4px'
  }}>
    <div >

      <svg width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g data-tip data-for="colorPicker">
          {isBackgroundActive ? (<TopColorSwatch />) : (<BottomColorSwatch />)}
        </g>
        <g data-tip data-for="colorPicker">
          {isBackgroundActive ? (<BottomColorSwatch />) : (<TopColorSwatch />)}
        </g>
      </svg>
    </div>
    <TooltipLarge
      event='click'
      id="colorPicker"
      effect="solid"
      border={true}
      place="right"
    >
      <ColorPicker />
    </TooltipLarge>
  </div>)
}

export default ColorSelector