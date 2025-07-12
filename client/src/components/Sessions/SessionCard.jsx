import { Avatar, Button, Tag, Typography } from "keep-react";
import React, { useState } from "react";
import { Clock, VideoCamera } from "phosphor-react";
import AddReviewModal from "./AddReviewModal";
import { Link } from "react-router-dom";
import generateUrl from "../../utils/routes";
import moment from "moment";
import UpdateSessionStatus from "./UpdateSessionStatus";

const SessionCard = ({ session }) => {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const toogleReviewModal = () => {
        setShowReviewModal((prev) => !prev);
    };

    return (
        <div className="border border-slate-50 rounded bg-white shadow-xl p-6">
            <div className="flex items-start md:gap-5 gap-3.5">
                <div className="w-20 h-20">
                    <Avatar
                        shape="circle"
                        img={
                            session.other_user.profile_picture ||
                            `https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg`
                        }
                        className="w-20 h-20 object-cover"
                    />
                </div>
                <div>
                    <Link
                        to={generateUrl("user_profile", {
                            user_id: session.other_user._id,
                        })}
                    >
                        <Typography
                            variant="heading-6"
                            className="text-lg tracking-normal"
                        >
                            Metting with {session.other_user.name}
                        </Typography>
                    </Link>
                    <div className="flex mb-4">
                        <Tag
                            color="info"
                            className="text-sm"
                            leftIcon={<Clock size={20} />}
                        >
                            {["pending", "rejected"].includes(session.status)
                                ? moment(session.start_time).format(
                                      "dddd, MMMM DD, YYYY"
                                  )
                                : ""}{" "}
                            {moment(session.start_time).format("hh:mm a")} -{" "}
                            {moment(session.end_time).format("hh:mm a")}
                        </Tag>
                    </div>
                    {session.description && (
                        <div className="mb-4">
                            <Typography
                                variant="body-6"
                                className="text-xs tracking-normal"
                            >
                                {session.description}
                            </Typography>
                        </div>
                    )}

                    <div>
                        {session.status === "rejected" && (
                            <div className="">
                                <Typography
                                    variant="body-6"
                                    className="text-base text-blue-600 tracking-normal"
                                >
                                    The request was rejected.
                                </Typography>
                            </div>
                        )}
                        {session.status === "accepted" &&
                            session.meeting_link && (
                                <a href={session.meeting_link} target="_blank">
                                    <Button size="sm" type="primary">
                                        <span className="pr-2">
                                            <VideoCamera size={24} />
                                        </span>
                                        Join Meeting
                                    </Button>
                                </a>
                            )}

                        {session.status === "completed" && (
                            <button
                                className="font-semibold text-base text-primary-600 bg-white border-0 hover:bg-white hover:text-primary-400 active:bg-white active:text-primary-400"
                                onClick={toogleReviewModal}
                            >
                                Review
                            </button>
                        )}

                        {session.status === "pending" && (
                            <UpdateSessionStatus session={session} />
                        )}
                    </div>
                </div>
            </div>
            {session.status === "completed" && (
                <AddReviewModal
                    showReviewModal={showReviewModal}
                    toogleReviewModal={toogleReviewModal}
                    session={session}
                />
            )}
        </div>
    );
};

export default SessionCard;
