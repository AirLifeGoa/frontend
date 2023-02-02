import {StyleSheet, css} from "aphrodite";
import themeVars from "../../util/themeVars";
import {NavLink} from "react-router-dom";
import {CirclesThree, HardDrives, House, ChartLineUp, UploadSimple} from "phosphor-react";
import LogoHeader from "../dashboard/LogoHeader";

const ProSideBar = () => {
    return (
        <div className={css(styles.sideBarDefault)}>
            <LogoHeader/>
            <div className={css(styles.sideBarNavCont)}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        !isActive ? css(styles.sideBarNavLink) : css(styles.sideBarNavLinkActive)
                    }>
                    <House size={20} weight="bold" /> Home
                </NavLink>
                <NavLink
                    to="datasources"
                    className={({ isActive }) =>
                        !isActive ? css(styles.sideBarNavLink) : css(styles.sideBarNavLinkActive)
                    }>
                    <CirclesThree size={20} weight="bold" /> Data Sources
                </NavLink>
                <NavLink
                    to="data"
                    className={({ isActive }) =>
                        !isActive ? css(styles.sideBarNavLink) : css(styles.sideBarNavLinkActive)
                    }>
                    <HardDrives size={20} weight="bold" /> Collected Data
                </NavLink>
                <NavLink
                    to="forecast"
                    className={({ isActive }) =>
                        !isActive ? css(styles.sideBarNavLink) : css(styles.sideBarNavLinkActive)
                    }>
                    <ChartLineUp size={20} weight="bold" /> Forecasts
                </NavLink>
                <NavLink
                    to="upload"
                    className={({ isActive }) =>
                        !isActive ? css(styles.sideBarNavLink) : css(styles.sideBarNavLinkActive)
                    }>
                    <UploadSimple size={20} weight="bold" /> Upload Data
                </NavLink>
            </div>

        </div>
    );
}

const styles = StyleSheet.create(
    {
        sideBarDefault: {
            backgroundColor: themeVars.colors.backgrounds.lightest,
            width: '30rem',
            minHeight: '100%',
            padding: '1rem',
            boxSizing: 'border-box',
        },

        sideBarNavCont: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            marginTop: '2rem',

        },

        sideBarNavLink: {
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: '22px',
            color:  themeVars.colors.accent.dark2,
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1.4rem',
            padding: '1rem',
            width: '100%',
            boxSizing: 'border-box',

        },

        sideBarNavLinkActive: {
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: '22px',
            color:  themeVars.colors.accent.darkGreen,
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1.4rem',
            padding: '1rem',
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: themeVars.colors.accent.transparentGreen,
            borderRadius: '0.4rem',
        }




    }
)

export default ProSideBar;