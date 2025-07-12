import { Breadcrumb, Typography } from "keep-react";
import React, { useEffect, useRef, useState } from "react";
import { CaretRight, List } from "phosphor-react";
import { Link, useParams } from "react-router-dom";
import generateUrl from "../../utils/routes";
import MessagesSidebar from "../../components/Messages/MessagesSidebar";
import UserAvatarCard from "../../components/UserAvatarCard/UserAvatarCard";
import SendMessagesForm from "../../components/Messages/SendMessagesForm";
import ShowMessages from "../../components/Messages/ShowMessages";
import { connect } from "react-redux";
import {
    getRooms,
    getMessages,
    newMessageReceived,
} from "../../redux/actions/messageRoomAction";
import Loader from "../../components/Loader/Loader";
import { io } from "socket.io-client";

const Messages = ({
    getRooms,
    messageRoom,
    getMessages,
    newMessageReceived,
}) => {
    const params = useParams();
    const messagesContainerRef = useRef();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const [isFromFetchMoreData, setIsFromFetchMoreData] = useState(false);
    const [lastMessagePosition, setLastMessagePosition] = useState(0);
    const token = localStorage.getItem("access_token");
    const { room_id } = params;
    const [formData, setFormData] = useState({
        page: 1,
        limit: 20,
    });

    useEffect(() => {
        getRooms();
    }, []);

    useEffect(() => {
        if (room_id) {
            setIsFromFetchMoreData(false);
            getMessages(formData, room_id);

            const socket = io(import.meta.env.VITE_APP_SOCKET_URL, {
                auth: { token: token },
            });
            socket.on("connection", () => {
                console.log("socket connection established");
            });
            socket.emit("join_message_room", {
                room_id: room_id,
            });
            socket.on("new-message", (message) => {
                newMessageReceived(message);
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [room_id]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const groupMessagesBySenderConsecutively = (messages) => {
        const grouped_messages = [];
        let current_group = null;

        messages.forEach((message) => {
            if (
                !current_group ||
                current_group.sender_id !== message.sender_id._id
            ) {
                if (current_group) {
                    grouped_messages.push(current_group);
                }

                current_group = {
                    sender_id: message.sender_id._id,
                    messages: [message],
                };
            } else {
                current_group.messages.push(message);
            }
        });

        if (current_group) {
            grouped_messages.push(current_group);
        }

        return grouped_messages;
    };

    const fetchMoreData = () => {
        setIsFromFetchMoreData(true);
        setLastMessagePosition(messagesContainerRef.current.scrollHeight);
        const data = formData;
        data.page = data.page + 1;
        setFormData(data);
        getMessages(data, room_id, undefined, true);
    };

    useEffect(() => {
        if (!isFromFetchMoreData && messagesContainerRef?.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        } else if (messagesContainerRef?.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight - lastMessagePosition;
        }
    }, [messageList, messagesContainerRef?.current]);

    useEffect(() => {
        const messages = groupMessagesBySenderConsecutively(
            messageRoom?.messages
        );
        setMessageList(messages);
    }, [messageRoom?.messages]);

    return (
        <div>
            <div className="w-full bg-white px-6 py-3 flex justify-between items-center shadow-xl border-b ">
                <Breadcrumb
                    separatorIcon={<CaretRight size={20} color="#AFBACA" />}
                >
                    <Breadcrumb.Item>
                        <Link to={generateUrl("messages")}>Messages</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div>
                <div className="bg-slate-100">
                    <div className="lg:grid lg:grid-cols-[0.25fr_0.75fr] xl:grid-cols-[0.2fr_0.8fr] 2xl:grid-cols-[0.15fr_0.85fr]">
                        <MessagesSidebar
                            toggleSidebar={toggleSidebar}
                            sidebarOpen={sidebarOpen}
                            rooms={messageRoom?.rooms}
                            activeRoom={room_id}
                        />
                        <div className="w-full ">
                            <div
                                className={`w-full bg-header_background border-b flex  items-center ${
                                    !room_id ? "justify-end" : "justify-between"
                                }`}
                            >
                                {room_id && messageRoom?.active_room
                                                ?.participants?.[0] && (
                                    <UserAvatarCard
                                        cardClassNames="bg-header_background"
                                        name={
                                            messageRoom?.active_room
                                                ?.participants?.[0]?.name
                                        }
                                        role={
                                            messageRoom?.active_room
                                                ?.participants?.[0]
                                                ?.professional_information?.role
                                        }
                                        link={generateUrl("user_profile", {
                                            user_id:
                                                messageRoom?.active_room
                                                    ?.participants?.[0]?._id,
                                        })}
                                        profile_image={
                                            messageRoom?.active_room
                                                ?.participants?.[0]
                                                ?.profile_picture
                                        }
                                    />
                                )}
                                <div className="lg:hidden px-6 flex items-center justify-center py-4">
                                    <button
                                        onClick={toggleSidebar}
                                        className="outline-none"
                                    >
                                        <List className="text-2xl" />
                                    </button>
                                </div>
                            </div>
                            {room_id && (
                                <div className="w-full flex flex-col h-[calc(100vh-76px-49px-75px)] bg-white">
                                    <div
                                        className="flex-1 overflow-y-scroll h-[calc(100vh-76px-49px-75px-82px)] custom-scrollbar "
                                        ref={messagesContainerRef}
                                    >
                                        <ShowMessages
                                            messages={messageList}
                                            pagination={messageRoom?.pagination}
                                            loading={
                                                messageRoom?.message_loading ||
                                                messageRoom?.loading
                                            }
                                            fetchMoreData={fetchMoreData}
                                            scrollRef={
                                                messagesContainerRef?.current
                                            }
                                        />
                                    </div>
                                    <SendMessagesForm
                                        room_id={room_id}
                                        setIsFromFetchMoreData={
                                            setIsFromFetchMoreData
                                        }
                                    />
                                </div>
                            )}
                            {messageRoom?.rooms.length === 0 && (
                                <div className="border border-dashed text-center p-6 my-6 rounded text-blue-700 border-slate-300 col-span-3 mx-6">
                                    <Typography
                                        variant="body-4"
                                        className="font-medium text-blue-700"
                                    >
                                        You have not message anybody yet.
                                    </Typography>
                                </div>
                            )}
                            {!room_id && messageRoom?.rooms.length > 0 && (
                                <div className="border border-dashed text-center p-6 my-6 rounded text-blue-700 border-slate-300 col-span-3 mx-6">
                                    <Typography
                                        variant="body-4"
                                        className="font-medium text-blue-700"
                                    >
                                        Click on the user to see the messages.
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Loader loading={messageRoom?.loading} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    messageRoom: state.messageRoom,
});

const mapDispatchToProps = {
    getRooms,
    getMessages,
    newMessageReceived,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
