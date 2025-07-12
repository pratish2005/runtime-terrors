import { Avatar, Typography } from "keep-react";
import React from "react";
import { Link } from "react-router-dom";
import generateUrl from "../../utils/routes";

const UserCard = ({ user }) => {
    return (
        <Link
            to={generateUrl("user_profile", {
                user_id: user._id,
            })}
        >
            <div className="border border-slate-50 rounded bg-white text-center shadow-xl relative mt-10">
                <div className="absolute left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <div className="relative">
                        <div className="w-20 h-20">
                            <Avatar
                                shape="circle"
                                img={
                                    user.profile_picture ||
                                    `https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg`
                                }
                                className="w-20 h-20 object-cover"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-14">
                    <div className="my-4">
                        <Typography variant="body-3" className="font-semibold">
                            {user.name}
                        </Typography>
                        {user?.professional_information?.role && (
                            <Typography
                                variant="body-6"
                                className="text-slate-400"
                            >
                                {user?.professional_information?.role}
                            </Typography>
                        )}
                        {(user?.city || user?.state) && (
                            <Typography
                                variant="body-6"
                                className="text-slate-400"
                            >
                                {user?.city}
                                {user?.city ? ", " : ""}
                                {user?.state}
                            </Typography>
                        )}
                    </div>
                    {user?.skill_scores?.length > 0 && (
                        <div className="my-4">
                            <Typography
                                variant="body-6"
                                className="font-semibold block"
                            >
                                Skills to Offer:
                            </Typography>
                            <Typography
                                variant="body-6"
                                className="text-slate-400 block"
                            >
                                {user?.skill_scores
                                    ?.map(
                                        (skill) =>
                                            `${skill.skill_name} (${skill.score})`
                                    )
                                    .join(", ")}
                            </Typography>
                        </div>
                    )}
                    {user?.professional_information?.skills_seeking?.length >
                        0 && (
                        <div className="my-4">
                            <Typography
                                variant="body-6"
                                className="font-semibold block"
                            >
                                Skills Seeking:
                            </Typography>
                            <Typography
                                variant="body-6"
                                className="text-slate-400 block"
                            >
                                {user?.professional_information?.skills_seeking.join(
                                    ", "
                                )}
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default UserCard;
