import SuccessfulTick from "../../../assets/svg/successfulTick"

const VerificationSuccessful = (setView) => {
    return(
        <div className='register verificationComponent'>
            <div className="centerDiv">
                <SuccessfulTick />
                <h3 className="headerBold">
                    Verification Successful
                </h3>
                <p className="headerText">
                    Your account has been verified successfully
                </p>
            </div>
            <p onClick={() => setView('Log in')} className='submitBtn'>
                Go Home
            </p>
        </div>
    )
}
export default VerificationSuccessful