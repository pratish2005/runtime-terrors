import { Button, Navbar } from "keep-react";
import { Link } from "react-router-dom";
import generateUrl from "../../utils/routes";
import UserDropDown from "./UserDropDown";
import NotificationDropDown from "./NotificationDropDown";

const RightSideContent = ({ isLoggedIn, user, logout }) => {
    return (
        <Navbar.Container
            tag="ul"
            className={`lg:flex hidden items-center justify-between ${
                isLoggedIn ? "" : "gap-5"
            }`}
        >
            {isLoggedIn && <NotificationDropDown user={user} logout={logout} />}
            {isLoggedIn && <UserDropDown user={user} logout={logout} />}
            {!isLoggedIn && (
                <Link to={generateUrl("login")} className="py-2.5">
                    <Button type="primary" size="xs">
                        Login
                    </Button>
                </Link>
            )}
            {!isLoggedIn && (
                <Link to={generateUrl("register")} className="py-2.5">
                    <Button type="primary" size="xs">
                        Register
                    </Button>
                </Link>
            )}
        </Navbar.Container>
    );
};

export default RightSideContent;
