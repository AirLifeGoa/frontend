import {useCallback, useEffect, useState} from "react";
import {StyleSheet, css} from "aphrodite";
import signinSignupImage from "../../assets/images/signin-signup-background.png";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import {useLocation, useNavigate} from "react-router-dom";
import {signinApi} from "../../util/api/signin-api";
import {signupApi} from "../../util/api/signup-api";
import {currentUserApi} from "../../util/api/current-user-api";
import VerifyEmailPrompt from "./VerifyEmailPrompt";
import useStore from "../../store/Store";
const SigninSignup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSignUp, setIsSignup] = useState(location.pathname === "/signup");
    const [verifyEmailPage, setVerifyEmailPage] = useState(false);

    const getUser = useCallback(
        useStore((store) => store.getUser),
        []
    );



    const changeMode = () => {
        setIsSignup(!isSignUp);
        navigate(isSignUp ? "/signin" : "/signup");
    }

    const [userDetails, setUserDetails] = useState({
            email: "",
            password: "",
            name: "",
            sub: false,
            areas: [] as string[],
        }
    );

    const [errors, setErrors] = useState({
            email: {
                error: false,
                message: ""
            },
            password: {
                error: false,
                message: ""
            },
            name: {
                error: false,
                message: ""
            },
            areas: {
                error: false,
                message: ""
            }
        }
    );

    const toLogin = () => {
        setIsSignup(false);
        navigate("/signin");
        setVerifyEmailPage(false);
    }

    const validateField = (field : string, value : string) => {
        let error = false;
        let message = "";
        if (field === "email") {
            if (!value) {
                error = true;
                message = "Email is required";
            } else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                error = true;
                message = "Please enter a valid email";
            }
        } else if (field === "password") {
            if (!value) {
                error = true;
                message = "Password is required";
            } else if (value.length < 6) {
                error = true;
                message = "Password must be atleast 6 characters long";
            }
        } else if (field === "name") {
            if (!value) {
                error = true;
                message = "Name is required";
            }
        }
        setErrors((prevState) => {
            return {
                ...prevState,
                [field]: {
                    error,
                    message
                }
            }
        }
        );
    }

    const validateForm = () => {
        validateField("name", userDetails.name);
        validateField("email", userDetails.email);
        validateField("password", userDetails.password);


        // check if any error is present
        let error = errors.email.error || errors.password.error || (isSignUp && errors.name.error);
        return !error;

    }

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        
        if(name === "sub")
        {
            setUserDetails({...userDetails, [name]: !userDetails.sub});
            
        }
        else
        {
            setUserDetails({...userDetails, [name]: value});
        }
    }

    const handleChangeopt = (e : {label: string, value:string}[]) => {
        const values = e.map(option => option.value) as string[];
        setUserDetails({...userDetails, areas: values})
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(userDetails);
        } else {
            return;
        }

        if (isSignUp) {
            const response = await signupApi(userDetails);
            if (response.type === "error") {
                if (response.status === 400) {
                    console.log("Email already in use");
                    changeMode();
                }
            } else {
                if (response.status === 200) {
                    setVerifyEmailPage(true);
                    console.log("Verification email resent");
                } else if (response.status === 201) {
                    setVerifyEmailPage(true);
                    console.log("User created");
                }
            }

        }
        else {
            const response = await signinApi(userDetails);
            if (response.type === "error") {
                if (response.status === 200) {
                    setVerifyEmailPage(true);
                } else if (response.status === 400) {
                    // set error message
                    setErrors((prevState) => {
                        return {
                            ...prevState,
                            email: {
                                error: true,
                                message: "Invalid email or password"
                            },
                            password: {
                                error: true,
                                message: "Invalid email or password"
                            }
                        }
                    });
                    return;
                }
            }
            else {
                const currentUser = await currentUserApi();
                if (currentUser.type === "error") {
                    console.log("Error getting current user");
                    return;
                }
                if (currentUser.status === 200) {
                    navigate("/");

                }

            else {
                    // set errors
                    setErrors((prevState) => {
                        return {
                            ...prevState,
                            email: {
                                error: true,
                                message: "Some error occured"
                            },
                            password: {
                                error: true,
                                message: "Some error occured"
                            }
                        }
                    });
                }


            }
        }
        getUser();
    }




    return (
         <div className={css(styles.signinSignupDefault)}>
             <div className={css(styles.signinSignupImgCont)}>
                 <img src={signinSignupImage} alt="signinSignupImg" className={css(styles.signinSignupImg)} />
             </div>
             <div className={css(styles.signinSignupFormCont)}>
                 {!isSignUp && !verifyEmailPage &&  <
                     SigninForm
                         changeMode={changeMode}
                         userDetails={userDetails}
                         errors={errors}
                         handleChange={handleChange}
                         validateField={validateField}
                         onSubmit={onSubmit}
                 />}
                 {isSignUp && !verifyEmailPage && <
                     SignupForm changeMode={changeMode}
                        userDetails={userDetails}
                        errors={errors}
                        handleChange={[handleChange, handleChangeopt]}
                        validateField={validateField}
                        onSubmit={onSubmit}
                 />}
                 {verifyEmailPage && <
                     VerifyEmailPrompt
                            toLogin={toLogin}
                 />
                 }
             </div>

         </div>
    );
};

export default SigninSignup;

const styles = StyleSheet.create(
    {
        signinSignupDefault: {
            display: 'flex',
            flexDirection: 'row',
            width: "100%",
            height: "80rem",
            backgroundColor: "transparent",
            borderRadius: "2rem",

        },
        signinSignupImgCont: {
            flex: "1",

        },
        signinSignupFormCont: {
            flex: "1",
            background: 'rgba(243, 249, 250, 0.87)',
            backdropFilter: 'blur(6px)',
            borderRadius: '0 2rem 2rem 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        },
        signinSignupImg: {
            width: "100%",
            height: "100%",
            borderRadius: "2rem 0 0 2rem",
            objectFit: "cover",
            // make image transparent
            // apply webkit specific blur
            WebkitBackdropFilter: 'blur(120px)',
        }
    }
)
