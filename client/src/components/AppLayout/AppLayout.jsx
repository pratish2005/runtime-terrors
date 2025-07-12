import React, { useEffect, useState } from "react";
import {
    VideoCamera,
    MagnifyingGlass,
    Chat,
    User,
    UserPlus,
    Bell,
} from "phosphor-react";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import generateUrl from "../../utils/routes";
import NavbarComponent from "../LayoutComponents/NavbarComponent";
import SidebarComponent from "../LayoutComponents/SidebarComponent";
import { io } from "socket.io-client";

import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from "react-toastify";

const menu = [
    {
        id: "search",
        label: "Search",
        link: generateUrl("dashboard"),
        icon: <MagnifyingGlass size={24} />,
        displayOn: ["mobile", "desktop"],
        showFor: ["logged_in", "logged_out"],
    },
    {
        id: "message",
        label: "Messages",
        link: "/messages",
        icon: <Chat size={24} />,
        displayOn: ["mobile", "desktop"],
        showFor: ["logged_in", "logged_out"],
    },
    {
        id: "sessions",
        label: "Sessions",
        link: generateUrl("sessions"),
        icon: <VideoCamera size={24} />,
        displayOn: ["mobile", "desktop"],
        showFor: ["logged_in", "logged_out"],
    },
    {
        id: "profile",
        label: "Profile",
        link: generateUrl("profile"),
        icon: <User size={24} />,
        show_on_all_view: false,
        displayOn: ["mobile"],
        showFor: ["logged_in"],
    },
    {
        id: "notifications",
        label: "Notifications",
        link: generateUrl("notifications"),
        icon: <Bell size={24} />,
        displayOn: ["mobile"],
        showFor: ["logged_in"],
    },
    {
        id: "login",
        label: "Login",
        link: generateUrl("login"),
        icon: <User size={24} />,
        displayOn: ["mobile"],
        showFor: ["logged_out"],
    },
    {
        id: "register",
        label: "Register",
        link: generateUrl("register"),
        icon: <UserPlus size={24} />,
        displayOn: ["mobile"],
        showFor: ["logged_out"],
    },
];

const AppLayout = ({ user, logout }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const token = localStorage.getItem("access_token");

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    useEffect(() => {
        const socket = io(import.meta.env.VITE_APP_SOCKET_URL, {
            auth: { token: token },
        });
        socket.on("connection", () => {
            console.log("socket connection established");
        });
        socket.on("notification", (data) => {
            toast[data.type](data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        });
        const updateUserStatus = () => {
            if (document.visibilityState !== "hidden") {
                socket.emit("update_user_active_status");
            }
        };

        const intervalId = setInterval(updateUserStatus, 40000);

        const handleVisibilityChange = () => {
            if (document.visibilityState !== "hidden") {
                updateUserStatus();
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
            socket.disconnect();
        };
    }, []);

    const filterMenuItems = (items, is_logged_in, current_view) => {
        return items?.filter((item) => {
            const userStatus = is_logged_in ? "logged_in" : "logged_out";
            return (
                item.displayOn.includes(current_view) &&
                item.showFor.includes(userStatus)
            );
        });
    };

    return (
        <div className="bg-slate-100 min-h-screen">
            <NavbarComponent
                logout={logout}
                toggleSidebar={toggleSidebar}
                user={user}
                menu={filterMenuItems(menu, user?.isLoggedIn, 'desktop')}
            />
            <div className="lg:grid">
                <SidebarComponent
                    user={user?.user}
                    toggleSidebar={toggleSidebar}
                    sidebarOpen={sidebarOpen}
                    logout={logout}
                    menu={filterMenuItems(menu, user?.isLoggedIn, 'mobile')}
                    isLoggedIn={user?.isLoggedIn}
                />
                <main className="w-full">
                    <Outlet />
                </main>
            </div>
            <ToastContainer />
        </div>
    );
};

const mapStateToProps = (store) => ({
    user: store.auth,
});

const mapDispatchToProps = {
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
