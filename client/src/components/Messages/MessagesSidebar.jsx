import React from "react";
import { Link, useLocation } from "react-router-dom";
import { User, ArrowLeft } from "phosphor-react";
import { Avatar, Card, Sidebar, Typography } from "keep-react";
import generateUrl from "../../utils/routes";
import UserAvatarCard from "../UserAvatarCard/UserAvatarCard";

const MessagesSidebar = ({ toggleSidebar, sidebarOpen, rooms, activeRoom }) => {
    const location = useLocation();
    return (
        <div
            className={`bg-white h-screen lg:h-[calc(100vh-76px-49px)] fixed inset-y-0 right-0 transform transition-transform duration-300 ${
                sidebarOpen ? "translate-x-0" : "translate-x-full"
            } lg:relative lg:translate-x-0 z-[85] w-2/3 md:w-1/3 lg:w-full border-r`}
        >
            <div className="py-4 px-6 w-full border-b">
                <Typography variant="heading-6 text-slate-500 font-semibold text-center">
                    Messages
                </Typography>
            </div>
            <div className="py-4 px-6 lg:hidden">
                <button
                    onClick={toggleSidebar}
                    className=" bg-transparent text-sm flex gap-4 items-center outline-none"
                >
                    <ArrowLeft className="text-lg" /> Go Back
                </button>
            </div>
            <div>
                <Sidebar
                    aria-label="Sidebar with multi-level dropdown example"
                    className="bg-white"
                    theme={{
                        root: {
                            inner: "h-full overflow-hidden overflow-y-scroll h-[calc(100vh-75px-52px)] lg:h-[calc(100vh-76px-49px-75px)] rounded m-0 p-0 bg-white custom-scrollbar",
                        },
                    }}
                >
                    {rooms.map((room) => (
                        <UserAvatarCard
                            key={room._id}
                            cardClassNames={
                                activeRoom === room._id
                                    ? "bg-header_background"
                                    : ""
                            }
                            name={room.participants?.[0]?.name}
                            role={
                                room.participants?.[0]?.professional_information
                                    ?.role
                            }
                            link={generateUrl("messages", {
                                room_id: room._id,
                            })}
                            profile_image={room.participants?.[0]?.profile_picture}
                        />
                    ))}
                </Sidebar>
            </div>
        </div>
    );
};

export default MessagesSidebar;
