import { Dropdown } from "keep-react";
import React from "react";
import {
    User,
    Trophy,
    EnvelopeOpen,
    UserPlus,
    CheckCircle,
    MinusCircle,
    Star,
    ThumbsUp,
    Check,
    X,
} from "phosphor-react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
    markNotification,
} from "../../redux/actions/notifcationAction";
import { connect } from "react-redux";
import Swal from "sweetalert2";

const NotificationCard = ({
    notification,
    markNotification,
    onNotificationMark
}) => {
    const handleMark = () => {
        markNotification(
            {
                action: notification?.is_read ? "unread" : "read",
            },
            notification._id,
            (response) => {
                Swal.fire("Success", response.message, "success");
                if(onNotificationMark){
                    onNotificationMark();
                }
            }
        );
    };
    return (
        <Dropdown.Item
            icon={<NotificaitonIcon type={notification.notification_type} />}
            className={`${!notification.is_read ? "bg-metal-200" : ""} flex`}
        >
            <Link
                to={notification.redirect_url}
                target="_blank"
                className="flex-1"
            >
                <div className={`flex flex-col items-start gap-1`}>
                    <p className="text-body-4 font-semibold text-metal-700">
                        {notification.title}
                    </p>
                    <p className="max-w-xs text-body-5 font-normal text-metal-500">
                        {notification.message}
                    </p>
                    <p className="max-w-xs text-body-5 font-normal text-blue-600">
                        {moment(notification.createdAt).fromNow()}
                    </p>
                </div>
            </Link>
            <div className="px-4">
                <button className="outline-none" onClick={handleMark}>
                    {notification?.is_read ? (
                        <X size={30} />
                    ) : (
                        <Check size={30} />
                    )}
                </button>
            </div>
        </Dropdown.Item>
    );
};

const NotificaitonIcon = ({ type }) => {
    const iconMap = {
        user_profile_score_updated: Trophy,
        receive_message: EnvelopeOpen,
        received_session_requets: UserPlus,
        session_request_accepted: CheckCircle,
        session_request_rejected: MinusCircle,
        request_review: Star,
        received_review: ThumbsUp,
    };

    const IconComponent = iconMap[type] || User;

    return <IconComponent size={30} className="mr-3" />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    markNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCard);
