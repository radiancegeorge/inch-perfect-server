
const User = (width, height, fill, stroke) =>{
    return(
        <svg width={width || "18"} height={height || "18"} viewBox="0 0 18 18" fill={fill || "none"} xmlns="http://www.w3.org/2000/svg">
            <path d="M15 15.75V14.25C15 13.4544 14.6839 12.6913 14.1213 12.1287C13.5587 11.5661 12.7956 11.25 12 11.25H6C5.20435 11.25 4.44129 11.5661 3.87868 12.1287C3.31607 12.6913 3 13.4544 3 14.25V15.75" stroke={stroke || "#797774"} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z" stroke={stroke || "#797774"} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
            <linearGradient id="paint0_linear" x1="-3.21428" y1="6.31564" x2="1.70951" y2="25.479" gradientUnits="userSpaceOnUse">
            <stop stop-color="#EB5757"/>
            <stop offset="1" stop-color="#A4FFFA"/>
            </linearGradient>
            <linearGradient id="paint1_linear" x1="2.89286" y1="-4.32915" x2="15.5932" y2="14.207" gradientUnits="userSpaceOnUse">
            <stop stop-color="#EB5757"/>
            <stop offset="1" stop-color="#A4FFFA"/>
            </linearGradient>
            </defs>
        </svg>
    )
}
export default User