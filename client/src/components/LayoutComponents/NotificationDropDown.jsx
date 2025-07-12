import React, { useEffect } from "react";
import { Badge, Dropdown, Typography } from "keep-react";
import { Bell } from "phosphor-react";
import NotificationCard from "../Notifications/NotificationCard";
import { getNotifications } from "../../redux/actions/notifcationAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import generateUrl from "../../utils/routes";
import Loader from "../Loader/Loader";

const NotificationDropDown = ({ notification, getNotifications }) => {
    useEffect(() => {
        handleGetNotifications();
    }, []);

    const handleGetNotifications = () => {
        getNotifications(
            {
                page: 1,
                limit: 5,
                unread: true,
            },
            "header"
        );
    };

    return (
        <>
            <Dropdown
                label={<Icon count={notification?.unread_notification_count} />}
                size="sm"
                type="linkPrimary"
                arrowIcon={false}
                className="bg-transparent hover:bg-transparent"
                onClick={handleGetNotifications}
            >
                {notification?.header_notifications.map((notification) => (
                    <NotificationCard
                        notification={notification}
                        key={notification._id}
                        onNotificationMark={handleGetNotifications}
                    />
                ))}
                {notification?.header_notifications.length === 0 && (
                    <div className="text-center p-6 rounded text-blue-600 border-slate-300 col-span-3 w-56">
                        <Typography
                            variant="paragraph-1"
                            className="font-medium text-blue-400"
                        >
                            No Unread Notifications
                        </Typography>
                    </div>
                )}
                <Link to={generateUrl("notifications")}>
                    <Typography
                        variant="body-5"
                        className="text-center text-blue-500 py-2"
                    >
                        View All Notifications
                    </Typography>
                </Link>
            </Dropdown>
            <Loader loading={notification.loading} />
        </>
    );
};

const Icon = ({ count }) => (
    <div className="relative">
        <Bell size={30} color="#64748b" />
        {count > 0 && (
            <Badge size="xs" colorType="light" color="success" className="text-xs px-1.5 py-0.5 -top-1 absolute -right-1">
                {count}
            </Badge>
        )}
    </div>
);

const mapStateToProps = (state) => ({
    notification: state.notification,
});

const mapDispatchToProps = {
    getNotifications,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationDropDown);
