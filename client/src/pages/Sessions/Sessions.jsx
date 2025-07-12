import { Breadcrumb, Button, Tabs, Tag, Typography } from "keep-react";
import React, { useEffect, useRef, useState } from "react";
import { CaretRight } from "phosphor-react";
import generateUrl from "../../utils/routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SessionCard from "../../components/Sessions/SessionCard";
import UpcomingSessionTab from "../../components/Sessions/UpcomingSessionTab";
import Loader from "../../components/Loader/Loader";
import { connect } from "react-redux";
import CompletedSessionTab from "../../components/Sessions/CompletedSessionTab";
import RequetSessionTab from "../../components/Sessions/RequetSessionTab";

const Sessions = ({ session }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const tableRef = useRef();

    const tabs_names = ["upcoming", "completed", "requests"];

    const handleTabChange = (tab_id) => {
        navigate(`?tab=${tabs_names[tab_id]}`);
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get("tab");
        if (tab && tableRef?.current) {
            const tab_id = tabs_names.findIndex(t => t === tab);
            tableRef?.current.setActiveTab(tab_id);
        }
    }, [tableRef]);
    return (
        <div>
            <div className="w-full bg-white px-6 py-3 flex justify-between items-center shadow-xl ">
                <Breadcrumb
                    separatorIcon={<CaretRight size={20} color="#AFBACA" />}
                >
                    <Breadcrumb.Item>
                        <Link to={generateUrl("sessions")}>Sessions</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="w-full lg:w-4/5 mx-auto p-6">
                <Tabs
                    aria-label="tabs"
                    style="underline"
                    borderPosition="bottom"
                    ref={tableRef}
                    onActiveTabChange={handleTabChange}
                >
                    <Tabs.Item title="Upcoming">
                        <UpcomingSessionTab />
                    </Tabs.Item>
                    <Tabs.Item title="Completed">
                        <CompletedSessionTab />
                    </Tabs.Item>
                    <Tabs.Item title="Requests">
                        <RequetSessionTab />
                    </Tabs.Item>
                </Tabs>
            </div>
            <Loader loading={session.loading} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
