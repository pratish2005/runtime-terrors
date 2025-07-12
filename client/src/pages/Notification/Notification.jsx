import { Breadcrumb, Pagination, Typography } from "keep-react";
import React, { useEffect, useState } from "react";
import { CaretRight } from "phosphor-react";
import { Link } from "react-router-dom";
import generateUrl from "../../utils/routes";
import { getNotifications } from "../../redux/actions/notifcationAction";
import Loader from "../../components/Loader/Loader";
import { connect } from "react-redux";
import NotificationCard from "../../components/Notifications/NotificationCard";

const Notification = ({ getNotifications, notification }) => {
    const [formData, setFormData] = useState({
        page: 1,
        limit: 10,
    });
    useEffect(() => {
        getNotifications({...formData});
    }, []);

    const onNotificationMark = () => {
        getNotifications({...formData});
    }

    const handlePageChange = (page) => {
        const data = { ...formData };
        data.page = page;
        setFormData(data);
        getNotifications(data);
    };

    return (
        <div>
            <div className="w-full bg-white px-6 py-3 flex justify-between items-center shadow-xl ">
                <Breadcrumb
                    separatorIcon={<CaretRight size={20} color="#AFBACA" />}
                >
                    <Breadcrumb.Item>
                        <Link to={generateUrl("notifications")}>
                            Notifications
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="w-full lg:w-4/5 mx-auto relative bg-white rounded shadow my-6">
                {notification?.notifications.map((notification) => (
                    <NotificationCard
                        notification={notification}
                        key={notification._id}
                        onNotificationMark={onNotificationMark}
                    />
                ))}
                {notification?.notifications.length === 0 && (
                    <div className="text-center p-6 rounded text-blue-600 border-slate-300 col-span-3 w-full">
                        <Typography
                            variant="paragraph-1"
                            className="font-medium text-blue-400"
                        >
                            No Notifications
                        </Typography>
                    </div>
                )}
            </div>
            {notification?.notifications.length > 0 && (
                <div className="m-full flex justify-center">
                    <Pagination
                        currentPage={formData.page}
                        onPageChange={handlePageChange}
                        totalPages={notification?.pagination?.total_pages}
                        iconWithOutText
                        prevNextShape="roundSquare"
                    />
                </div>
            )}
            <Loader loading={notification.loading} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    notification: state.notification,
});

const mapDispatchToProps = {
    getNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
