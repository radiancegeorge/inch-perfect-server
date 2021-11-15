import SuccessfulTick from "../../../assets/svg/successfulTick"

const RegistrationSuccessful = ({setView}) => {
    return(
        <div className='register verificationComponent'>
            <div className="centerDiv">
                <SuccessfulTick />
                <h3 className="headerBold">
                    Registration Successful
                </h3>
                <p className="headerText">
                    Check your email for a link to verify your account
                </p>
            </div>
            <p onClick={() => setView('Log in')} className='submitBtn'>
                Verified? Login
            </p>
        </div>
    )
}
export default RegistrationSuccessful