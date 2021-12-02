import React from 'react'

export default function Tweet(props) {
    
    return (
        <div >
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
<path d="M18.2077 1.37515C17.4496 1.9099 16.6102 2.3189 15.7218 2.5864C15.2451 2.03818 14.6114 1.64961 13.9066 1.47326C13.2018 1.2969 12.4598 1.34126 11.781 1.60034C11.1022 1.85942 10.5194 2.32072 10.1113 2.92184C9.70322 3.52297 9.48961 4.23491 9.49935 4.9614V5.75307C8.1081 5.78914 6.72952 5.48058 5.4864 4.85488C4.24327 4.22917 3.17418 3.30573 2.37435 2.16681C2.37435 2.16681 -0.792318 9.29182 6.33268 12.4585C4.70227 13.5652 2.76001 14.1201 0.791016 14.0418C7.91602 18.0001 16.6243 14.0418 16.6243 4.93765C16.6236 4.71713 16.6024 4.49716 16.561 4.28057C17.369 3.48375 17.9392 2.47771 18.2077 1.37515V1.37515Z" stroke="url(#paint0_linear_135_345)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_135_345" x1="-8.22833" y1="-14.2094" x2="19.2335" y2="34.9318" gradientUnits="userSpaceOnUse">
<stop stop-color={props.one}/>
<stop offset="1" stop-color={props.two}/>
</linearGradient>
</defs>
</svg>

        </div>
    )
}
