import { Avatar, Button, Typography } from "keep-react";
import React from "react";
import { DownloadSimple } from "phosphor-react";
import FileIcon from "./FileIcon";
import { connect } from "react-redux";
import moment from "moment";
import InfiniteScrollComponent from "../InfiniteScrollComponent/InfiniteScrollComponent";

const ShowMessages = ({
    messages,
    auth,
    pagination,
    fetchMoreData,
    loading,
    scrollRef,
}) => {
    return (
        <InfiniteScrollComponent
            dataLength={pagination?.total_docs || 0}
            fetchMoreData={fetchMoreData}
            hasMore={pagination?.hasNextPage || false}
            endMessage={
                messages.length > 0 && (
                    <div className="text-center rounded text-blue-600 border-slate-300 col-span-3">
                        <Typography
                            variant="paragraph-1"
                            className="font-medium text-blue-400"
                        >
                            You have reached the first message.
                        </Typography>
                    </div>
                )
            }
            containerClasses="p-4"
            isLoading={loading}
            reverse={true}
            scrollRef={scrollRef}
            loadMoreButton={true}
        >
            {messages.map((messages_by_sender) => {
                return messages_by_sender.messages.map((message, index) => (
                    <MessageContainer
                        key={message._id}
                        data={message}
                        isFromAuth={
                            messages_by_sender.sender_id === auth?.user?._id
                        }
                        showAvatar={
                            messages_by_sender.messages.length === index + 1
                        }
                    />
                ));
            })}
        </InfiniteScrollComponent>
    );
};

const MessageContainer = ({ data, showAvatar, isFromAuth }) => (
    <div className={`my-4`}>
        <div
            className={`flex gap-2 ${isFromAuth ? "flex-row-reverse" : ""} ${
                data.content_type === "text"
                    ? `max-w-[80%] lg:max-w-[66%] 2xl:max-w-[70%]`
                    : "w-96 max-w-full"
            } ${isFromAuth ? "ml-auto " : ""}`}
        >
            <AvatarContainer
                showAvatar={showAvatar}
                profile_picture={data.sender_id.profile_picture}
            />
            {data.content_type === "image" && (
                <ImageMessage image={data.file_url} />
            )}
            {data.content_type === "text" && <TextMessage text={data.text} />}
            {data.content_type === "file" && (
                <FileMessage
                    file_name={data.file_name}
                    file_url={data.file_url}
                />
            )}
        </div>
        <div className={`flex gap-2 ${isFromAuth ? "flex-row-reverse" : ""}`}>
            <div className="w-10"></div>
            <div className={`flex-1 px-1 ${isFromAuth ? "text-end" : ""}`}>
                <p className="text-xs text-slate-400">
                    {moment(data.createdAt).format("DD MMM YYYY hh:mm a")}
                </p>
            </div>
        </div>
    </div>
);

const TextMessage = ({ text }) => (
    <div className="flex-1 bg-slate-50 border border-slate-100 p-4 rounded">
        <p className="text-slate-800 text-sm ">{text}</p>
    </div>
);

const ImageMessage = ({ image }) => (
    <div className="flex-1 bg-slate-50 border border-slate-100 rounded h-52">
        <img src={image} className="w-full h-[100%] object-cover rounded" />
    </div>
);

const FileMessage = ({ file_name, file_url }) => (
    <div className="flex-1 bg-slate-50 border border-slate-100 rounded flex p-4 gap-4">
        <FileIcon file_name={file_name} />
        <p className="font-semibold text-sm text-slate-700 max-w-xs flex-1 truncate">
            {file_name}
        </p>
        <a
            href={file_url}
            download={file_name}
            className="flex items-center justify-center p-0 ml-auto border-none outline-none"
        >
            <DownloadSimple size={20} />
        </a>
    </div>
);

const AvatarContainer = ({ showAvatar, profile_picture }) => {
    if (showAvatar) {
        return (
            <div className="w-10 flex items-end">
                <Avatar
                    size="md"
                    shape="circle"
                    img={
                        profile_picture ||
                        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                    }
                    className="object-cover"
                />
            </div>
        );
    }
    return <div className="w-10"></div>;
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(ShowMessages);
