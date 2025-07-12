import React from "react";
import { Avatar, Dropdown } from "keep-react";
import UserAvatarCard from "../UserAvatarCard/UserAvatarCard";
import { Link } from "react-router-dom";
import { User, SignOut } from "phosphor-react";
import generateUrl from "../../utils/routes";

const UserDropDown = ({ user, logout }) => {
    return (
        <Dropdown
            label={
                <Avatar
                    size="md"
                    shape="circle"
                    img={`${
                        user.profile_picture ||
                        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                    }`}
                    className="object-cover"
                />
            }
            size="sm"
            type="linkPrimary"
            arrowIcon={false}
            className="bg-transparent hover:bg-transparent px-0"
        >
            <UserAvatarCard
                avatar_size="lg"
                name={user.name}
                role={user?.professional_information?.role}
                profile_image={user.profile_picture}
            />
            <Dropdown.Item
                icon={
                    <Link to={generateUrl("profile")}>
                        <User size={20} color="#444" />
                    </Link>
                }
            >
                <Link to={generateUrl("profile")} className="w-full">
                    Profile
                </Link>
            </Dropdown.Item>
            <Dropdown.Item icon={<SignOut size={20} />} onClick={logout}>
                Logout
            </Dropdown.Item>
        </Dropdown>
    );
};

export default UserDropDown;
