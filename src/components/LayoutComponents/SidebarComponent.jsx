import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, SignOut } from "phosphor-react";
import { Sidebar } from "keep-react";

const SidebarComponent = ({
    toggleSidebar,
    sidebarOpen,
    logout,
    menu,
    isLoggedIn,
}) => {
    const location = useLocation();
    return (
        <div
            className={`bg-header_background h-screen md:h-[calc(100vh-72px)] fixed inset-y-0 right-0 transform transition-transform duration-300 ${
                sidebarOpen ? "translate-x-0" : "translate-x-full"
            } lg:relative lg:translate-x-0 z-[85] w-2/3 md:hidden`}
        >
            <div className="py-4 px-6 lg:hidden">
                <button
                    onClick={toggleSidebar}
                    className=" bg-transparent text-sm flex gap-4 items-center outline-none"
                >
                    <ArrowLeft className="text-lg" /> Go Back
                </button>
            </div>
            <Sidebar
                aria-label="Sidebar with multi-level dropdown example"
                className="bg-header_background"
                theme={{
                    root: {
                        inner: "h-full overflow-y-auto overflow-x-hidden rounded py-4 px-3 bg-header_background",
                    },
                }}
            >
                <Sidebar.ItemGroup className="bg-header_background">
                    {menu.map((item) => (
                        <Sidebar.Item
                            as="div"
                            icon={item.icon}
                            key={item.id}
                            active={location.pathname === item.link}
                        >
                            <Link to={item.link}>{item.label}</Link>
                        </Sidebar.Item>
                    ))}
                    {isLoggedIn && (
                        <Sidebar.Item
                            icon={<SignOut size={24} />}
                            onClick={logout}
                            className="lg:hidden cursor-pointer"
                        >
                            Logout
                        </Sidebar.Item>
                    )}
                </Sidebar.ItemGroup>
            </Sidebar>
        </div>
    );
};

export default SidebarComponent;
