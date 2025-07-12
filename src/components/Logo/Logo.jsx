import { Typography } from "keep-react";
import React from "react";
import logoImage from "../../assets/logo.png";
import { routes } from "../../utils/routes";
import { Link } from "react-router-dom";

const Logo = ({ showImageLogo }) => {
    return (
        <>
            <Link to={routes.landing_page}>
                {!showImageLogo && (
                    <Typography
                        variant="heading-6"
                        className="text-center font-semibold tracking-widest"
                    >
                        Skill Swap
                    </Typography>
                )}
                {showImageLogo && <img src={logoImage} className="w-[180px] md:w-[250px]"/>}
            </Link>
        </>
    );
};

export default Logo;
