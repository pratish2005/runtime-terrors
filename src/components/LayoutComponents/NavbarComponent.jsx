import { Navbar } from "keep-react";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { List } from "phosphor-react";
import RightSideContent from "./RightSideContent";

const NavbarComponent = ({ logout, toggleSidebar, user, menu }) => {
    return (
        <Navbar fluid={true} className="bg-header_background sticky top-0 z-50">
            <Navbar.Container className="flex items-center justify-between px-0 lg:px-12 py-2">
                <Navbar.Container
                    tag="div"
                    className="flex items-center justify-between gap-8"
                >
                    <Navbar.Brand className="text-xl font-medium">
                        <Logo showImageLogo={true} />
                    </Navbar.Brand>
                    <Navbar.Divider></Navbar.Divider>
                    <Navbar.Container
                        tag="ul"
                        className="lg:flex hidden items-start justify-between gap-8"
                    >
                        {menu.map((link) => (
                            <Link to={link.link} key={link.id}>
                                {link.label}
                            </Link>
                        ))}
                    </Navbar.Container>
                </Navbar.Container>

                <Navbar.Container className="flex items-center gap-3">
                    <RightSideContent
                        isLoggedIn={user?.isLoggedIn}
                        user={user?.user}
                        logout={logout}
                    />
                </Navbar.Container>
                <div className="lg:hidden">
                    <button onClick={toggleSidebar} className="outline-none">
                        <List className="text-2xl" />
                    </button>
                </div>
            </Navbar.Container>
        </Navbar>
    );
};

export default NavbarComponent;
