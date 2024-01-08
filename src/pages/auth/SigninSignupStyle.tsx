import {StyleSheet} from "aphrodite";
import themeVars from "../../util/themeVars";

export const styles = StyleSheet.create(
    {
        SigninFormDefault: {
            width: "100%",
            height: "auto",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
        },

        SigninFormHeader: {
            width: "100%",
            height: '2.4rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '2rem',
            fontWeight: 800,
            lineHeight: '2.8rem',
        },
        SigninFormHeaderCont: {
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0rem',
        },

        SigninFormBody: {
            width: "90%",
            maxWidth: "32rem",
            height: "100%",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.6rem',
        },

        SigninFormSubHeader: {
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '1.4rem',
            lineHeight: '2rem',
            fontColor: themeVars.colors.accent.black,


        },

        Link: {
            color: themeVars.colors.accent.darkGreen,
            fontSize: '1.4rem',
            fontWeight: 600,
            lineHeight: '2rem',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
            textDecoration: 'underline',
        },

        verifyEmailBox: {
            width: "100%",
            height: "auto",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        },

        iconCont: {
            width: "8rem",
            height: "8rem",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            color: "white",
            backgroundColor: themeVars.colors.accent.green,
        },

        verifyEmailText: {
            fontSize: '2rem',
            lineHeight: '3.6rem',
            fontColor: themeVars.colors.accent.black,
            fontWeight: 800,
        },

        CheckboxContainer: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
        },
        

        verifyEmailSubText: {
            width: "100%",
            display: 'flex',
            fontSize: '1.4rem',
            lineHeight: '1.6rem',
            fontColor: themeVars.colors.accent.black,
            whiteSpace: 'pre-wrap',
            textAlign: 'center',
        },

        verifyEmailPS: {
            fontSize: '1.2rem',
            lineHeight: '3rem',
        }
    }
)

