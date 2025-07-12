import { Avatar, Card } from "keep-react";
import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const UserAvatarCard = ({
    cardClassNames,
    name,
    role,
    profile_image,
    avatar_size = "md",
    link,
}) => {
    const CardContent = () => (
        <Card
            className={twMerge(
                `max-w-xs px-6 py-4 md:max-w-lg rounded-none border-none`,
                cardClassNames
            )}
        >
            <Card.Container className="flex items-center">
                <Avatar
                    size={avatar_size}
                    shape="circle"
                    img={
                        profile_image ||
                        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                    }
                    className="object-cover"
                />
                <Card.Container className="ml-3">
                    <Card.Title className="text-body-5 font-semibold text-metal-800 md:text-body-4">
                        {name}
                    </Card.Title>
                    <Card.Title className="!text-body-6 font-normal text-metal-400 md:text-body-5">
                        {role || ""}
                    </Card.Title>
                </Card.Container>
            </Card.Container>
        </Card>
    );
    return link ? (
        <Link to={link} className="no-underline">
            <CardContent />
        </Link>
    ) : (
        <CardContent />
    );
};

export default UserAvatarCard;
