import style from "./SignUp.module.css"
import container from "../../StyleContainer/Container.module.css"
import SignUpForm from "../../components/SignUpForm/SignUpForm";

function SignUp() {
    return(
        <div className={style.signUp}>
            <div className={container.container}>
                <SignUpForm />
            </div>
        </div>
    );
}

export default SignUp;