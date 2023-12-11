import {StyleSheet, css} from "aphrodite";
import Input from "../../components/Input";
import themeVars from "../../util/themeVars";
import Button from "../../components/buttons/Button";
import VerticalGap from "../../components/VerticalGap";
import {styles} from "./SigninSignupStyle";
import Checkbox from "../../components/checkbox";
import DropDown from "../../components/dropdowninput";
import data from "../../components/options";


interface ISignupFormProps {
    changeMode: () => void;
    userDetails: {
        email: string;
        password: string;
        name: string;
        sub: boolean;
        areas: string[];
    },

    errors: {
        email: {
            error: boolean,
            message: string
        },
        password: {
            error: boolean,
            message: string
        },
        name: {
            error: boolean,
            message: string
        }
    },

    handleChange: ((e: any) => void)[];
    validateField: (field: string, value: string) => void;

    onSubmit: (e: any) => void;
} 
const SignupForm = ({changeMode, userDetails, errors, handleChange, validateField, onSubmit}:ISignupFormProps) => {

    return(
        <div className={css(styles.SigninFormDefault)}>
            <div className={css(styles.SigninFormHeaderCont)}>
                <div className={css(styles.SigninFormHeader)}>
                    Join for updates and more!
                </div>
                <div className={css(styles.SigninFormSubHeader)}>
                    Already with us <button onClick={changeMode} className={css(styles.Link)} >Sign in</button>
                </div>
            </div>
            <form className={css(styles.SigninFormBody)}>
                <Input
                    label={"Name"}
                    name={"name"}
                    type={"text"}
                    value={userDetails.name}
                    placeHolder={"Enter your name"}
                    onChange={(e)=>{handleChange[0](e)}}
                    onBlur={validateField}
                    error={errors.name}
                />
                <Input
                    label={"Email"}
                    name={"email"}
                    type={"email"}
                    value={userDetails.email}
                    placeHolder={"Enter your email address"}
                    onChange={(e)=>{handleChange[0](e)}}
                    onBlur={validateField}
                    error={errors.email}
                />
                <Input
                    label={"Password"}
                    name={"password"}
                    type={"password"}
                    value={userDetails.password}
                    placeHolder={"Enter your password"}
                    onChange={(e)=>{handleChange[0](e)}}
                    onBlur={validateField}
                    error={errors.password}
                />

                <DropDown
                    options = {data}
                    label = {"Localities"}
                    name = {"areas"}
                    value = {userDetails.areas}
                    onChange = {(e)=>{handleChange[1](e)}}
                />

                <VerticalGap gap={"0.8rem"}/>
                <Checkbox
                    label={"Subscribe to newsletter"}
                    name={"sub"}
                    value = {userDetails.sub}
                    onChange={handleChange[0]}
                />
                

                <Button  onClick={onSubmit} type={"long"}
                         color={themeVars.colors.accent.green}
                         hoverColor={themeVars.colors.accent.darkGreen}>
                    Sign up
                </Button>

            </form>
        </div>
    )
}

export default SignupForm;
