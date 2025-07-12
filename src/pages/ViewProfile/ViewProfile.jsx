import {
    Avatar,
    Breadcrumb,
    Button,
    Popover,
    Tabs,
    Typography,
} from "keep-react";
import React, { useEffect, useRef, useState } from "react";
import { CaretRight, Info } from "phosphor-react";
import generateUrl from "../../utils/routes";
import banner from "../../assets/images/profile/banner.svg";
import { connect } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { getUserProfile } from "../../redux/actions/userAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import SkillScoreStatistic from "../../components/SkillScoreStatics/SkillScoreStatistic";
import ProjectsTab from "../../components/ViewProfile/ProjectsTab";
import EducationTab from "../../components/ViewProfile/EducationTab";
import CertificationTab from "../../components/ViewProfile/CertificationTab";
import TextContent from "../../components/ViewProfile/TextContent";
import { createRoom } from "../../redux/actions/messageRoomAction";
import Swal from "sweetalert2";
import CreateSessionModal from "../../components/Sessions/CreateSessionModal";
import ShowReviews from "../../components/ViewProfile/ShowReviews";

const ViewProfile = ({ users, getUserProfile, createRoom, messageRoom }) => {
    const params = useParams();
    const navigate = useNavigate();
    const { user_id } = params;
    const [user, setUser] = useState(null);
    const [showCreateSessionModal, setShowCreateSessionModal] = useState(false);
    const personalInformationRef = useRef();
    const [personalInformationHeight, setPersonalInformationHeight] =
        useState(0);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setPersonalInformationHeight(entry.target.offsetHeight);
            }
        });

        if (personalInformationRef.current) {
            resizeObserver.observe(personalInformationRef.current);
        }

        return () => {
            if (personalInformationRef.current) {
                resizeObserver.unobserve(personalInformationRef.current);
            }
        };
    }, [users.user]);

    useEffect(() => {
        if (users.user) {
            setUser(users.user);
        }
    }, [users.user]);

    useEffect(() => {
        getUserProfile(user_id);
    }, [user_id]);

    const message = () => {
        if (user?.room) {
            navigate(
                generateUrl("messages", {
                    room_id: user.room._id,
                })
            );
        } else {
            Swal.fire({
                title: "Are you sure?",
                text: `Do you want to start messaging ${user.name}?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, start messaging",
                cancelButtonText: "No, cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    createRoom(
                        {
                            user_id: user_id,
                        },
                        (data) => {
                            if (data?.data?.room?._id) {
                                navigate(
                                    generateUrl("messages", {
                                        room_id: data?.data?.room?._id,
                                    })
                                );
                            }
                        }
                    );
                }
            });
        }
    };

    const toogleShowCreateSessionModal = () => {
        setShowCreateSessionModal((prev) => !prev);
    };

    return (
        <div className="">
            <div className="w-full bg-white px-6 flex justify-between items-center shadow-xl py-3">
                <Breadcrumb
                    separatorIcon={<CaretRight size={20} color="#AFBACA" />}
                >
                    <Breadcrumb.Item>
                        <Link to={generateUrl("dashboard")}>Search</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active={true}>
                        <Link
                            to={generateUrl("user_profile", {
                                user_id: user_id,
                            })}
                        >
                            Profile
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            {user && (
                <div className="">
                    <div
                        style={{
                            height: `${personalInformationHeight + 128}px`,
                        }}
                    >
                        <div className={`relative`}>
                            <img
                                src={banner}
                                className="w-full object-cover h-64"
                            />
                            <div className="flex justify-center items-center">
                                <div
                                    className="w-4/5 md:w-3/4 absolute top-1/2"
                                    ref={personalInformationRef}
                                >
                                    <div className="relative bg-white rounded-lg shadow-xl  w-full mb-6 border border-slate-50">
                                        <div className="absolute left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                            <div className="relative">
                                                <div className="w-40 h-40">
                                                    <Avatar
                                                        shape="circle"
                                                        img={
                                                            user.profile_picture ||
                                                            `https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg`
                                                        }
                                                        className="w-40 h-40 object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-6 pt-24 md:grid md:grid-cols-2 pb-4 border-b">
                                            <TextContent
                                                title="Full Name :"
                                                value={user.name}
                                            />
                                            <TextContent
                                                title="Located :"
                                                value={` ${
                                                    user.city
                                                        ? `${user.city} ,`
                                                        : ""
                                                } ${
                                                    user.state ? user.state : ""
                                                } ${
                                                    !user.city && !user.state
                                                        ? "--"
                                                        : ""
                                                }`}
                                            />
                                            <TextContent
                                                title="About :"
                                                value={user.about}
                                            />
                                        </div>
                                        <div className="pt-6 flex justify-center gap-6">
                                            <Button
                                                type="primary"
                                                onClick={message}
                                            >
                                                {user.room
                                                    ? "Message"
                                                    : "Start Messaging"}
                                            </Button>
                                            {user?.room && (
                                                <Button
                                                    type="primary"
                                                    onClick={
                                                        toogleShowCreateSessionModal
                                                    }
                                                >
                                                    Request Session
                                                </Button>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <div className="font-medium text-2xl md:text-heading-6 flex items-center gap-4">
                                                Skill Scores
                                                <Popover
                                                    trigger="hover"
                                                    className="shadow-2xl"
                                                    icon={<></>}
                                                >
                                                    <Popover.Description>
                                                        AI generates these
                                                        scores according to the
                                                        details included in the
                                                        profile, like projects,
                                                        educational background,
                                                        and certifications.
                                                    </Popover.Description>
                                                    <Popover.Action>
                                                        <Info
                                                            size={35}
                                                            className="md:mt-1"
                                                        />
                                                    </Popover.Action>
                                                </Popover>
                                            </div>
                                        </div>
                                        {(user?.professional_information
                                            ?.skills_to_offer?.length === 0 ||
                                            !user?.professional_information
                                                ?.skills_to_offer) && (
                                            <div className=" px-6 mb-6">
                                                <p className="font-medium text-orange-500">
                                                    Looks like {user.name}{" "}
                                                    haven't added any skills
                                                    yet.
                                                </p>
                                            </div>
                                        )}
                                        {user?.professional_information
                                            ?.skills_to_offer?.length > 0 &&
                                            user?.skill_scores?.length ===
                                                0 && (
                                                <div className=" px-6 mb-6">
                                                    <p className="font-medium text-blue-500">
                                                        We're now processing the
                                                        user informations to
                                                        provide personalized
                                                        scores. Please check
                                                        back in some time.
                                                    </p>
                                                </div>
                                            )}
                                        {user?.skill_scores?.length > 0 && (
                                            <div className="px-6 flex flex-wrap gap-6 mb-6">
                                                {user?.skill_scores?.map(
                                                    (skill) => (
                                                        <SkillScoreStatistic
                                                            skill={skill}
                                                            key={
                                                                skill.skill_name
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center flex-col md:flex-row gap-6 w-4/5 md:w-3/4 mx-auto">
                        <div className="bg-white rounded-lg shadow-xl w-full md:w-1/2 border border-slate-50 mb-6">
                            <div className="pt-6 px-6">
                                <Typography
                                    variant="heading-6"
                                    className="font-medium text-2xl md:text-heading-6"
                                >
                                    Professional Information
                                </Typography>
                            </div>
                            <div className="p-6 flex flex-col gap-0.5">
                                <TextContent
                                    title="Current Occupation/Role :"
                                    value={user.role}
                                />
                                <TextContent
                                    title="Industry/Sector :"
                                    value={user.role}
                                />
                                <TextContent
                                    title="Skills to Offer :"
                                    value={user?.professional_information?.skills_to_offer?.join(
                                        ", "
                                    )}
                                />
                                <TextContent
                                    title="Skills Seeking :"
                                    value={user?.professional_information?.skills_seeking?.join(
                                        ", "
                                    )}
                                />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-xl w-full md:w-1/2 border border-slate-50 mb-6">
                            <div className="pt-6 px-6">
                                <Typography
                                    variant="heading-6"
                                    className="font-medium text-2xl md:text-heading-6"
                                >
                                    Interests and Goals
                                </Typography>
                            </div>
                            <div className="p-6">
                                <TextContent
                                    title="Short Term Goal :"
                                    value={user?.interests?.short_goal}
                                />
                                <TextContent
                                    title="Long Term Goal :"
                                    value={user?.interests?.long_goal}
                                />
                                <TextContent
                                    title="Hobbies and Interests :"
                                    value={user?.interests?.hobbies?.join(", ")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-xl w-4/5 md:w-3/4 mx-auto border border-slate-50 mb-6 p-6">
                        <Tabs
                            aria-label="Tabs"
                            style="underline"
                            borderPosition="bottom"
                            iconPosition="left"
                        >
                            <Tabs.Item title="Projects" className="p-6">
                                <ProjectsTab
                                    projects={user?.projects}
                                    user={user}
                                />
                            </Tabs.Item>
                            <Tabs.Item title="Education" className="p-6">
                                <EducationTab
                                    education={user?.education}
                                    user={user}
                                />
                            </Tabs.Item>
                            <Tabs.Item title="Certifications" className="p-6">
                                <CertificationTab
                                    certifications={user?.certifications}
                                    user={user}
                                />
                            </Tabs.Item>
                        </Tabs>
                    </div>
                    <ShowReviews user_id={user_id} />
                </div>
            )}
            <CreateSessionModal
                toogleShowCreateSessionModal={toogleShowCreateSessionModal}
                showCreateSessionModal={showCreateSessionModal}
                user_id={user_id}
            />
            <Loader loading={users.loading || messageRoom.loading} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    users: state.users,
    messageRoom: state.messageRoom,
});

const mapDispatchToProps = {
    getUserProfile,
    createRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
