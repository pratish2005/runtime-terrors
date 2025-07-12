import React, { useState } from "react";
import { PaperPlaneTilt, Image, FileArrowUp } from "phosphor-react";
import { Button } from "keep-react";
import { connect } from "react-redux";
import { addMessage } from "../../redux/actions/messageRoomAction";
import Swal from "sweetalert2";

const SendMessagesForm = ({
    room_id,
    messageRoom,
    addMessage,
    setIsFromFetchMoreData,
}) => {
    const [text, setText] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        addMessage(
            {
                content_type: "text",
                text: text,
            },
            room_id,
            () => {
                setIsFromFetchMoreData(false);
                setText("");
            }
        );
    };

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        if (file.type.startsWith("image/")) {
            addMessage(
                {
                    content_type: "image",
                    file: file,
                },
                room_id,
                () => {
                    setIsFromFetchMoreData(false);
                    setText("");
                }
            );
        } else {
            Swal.fire("Error", "Please upload a valid image file", "error");
        }
    };

    const handleUploadFile = (e) => {
        const file = e.target.files[0];
        if(file){
            addMessage(
                {
                    content_type: "file",
                    file: file,
                },
                room_id,
                () => {
                    setIsFromFetchMoreData(false);
                    setText("");
                }
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="flex gap-4 w-full">
                <div className="w-3/4 sm:w-full  flex border border-slate-300 rounded-lg bg-white gap-4 items-center justify-center px-4">
                    <div className="flex-1">
                        <input
                            className="border-none outline-none w-full"
                            placeholder="Type a message"
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div>
                            <input type="file" className="hidden" id="image" onChange={handleUploadImage}/>
                            <label
                                htmlFor="image"
                                className="text-slate-500 cursor-pointer"
                            >
                                <Image size={20} />
                            </label>
                        </div>
                        <div>
                            <input type="file" className="hidden" id="file" onChange={handleUploadFile} />
                            <label
                                htmlFor="file"
                                className="text-slate-500 cursor-pointer"
                            >
                                <FileArrowUp size={20} />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <button className="hidden" type="submit"></button>
                    <Button
                        size="md"
                        type="primary"
                        className="rounded-lg flex items-center justify-center"
                        onClick={handleSubmit}
                    >
                        <PaperPlaneTilt size={24} />
                    </Button>
                </div>
            </div>
        </form>
    );
};

const mapStateToProps = (state) => ({
    messageRoom: state.messageRoom,
});

const mapDispatchToProps = {
    addMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMessagesForm);
