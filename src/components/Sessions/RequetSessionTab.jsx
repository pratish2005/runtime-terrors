import { Typography } from "keep-react";
import React, { useEffect } from "react";
import SessionCard from "./SessionCard";
import { getSessions } from "../../redux/actions/sessionAction";
import { connect } from "react-redux";

const RequestSessionTab = ({ getSessions, session }) => {
    useEffect(() => {
        getSessions({
            status: "requests",
        });
    }, []);
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {session?.requests.map((session) => (
                    <SessionCard session={session} key={session._id} />
                ))}
            </div>
            {session?.requests.length === 0 && (
                <div className="border border-dashed text-center p-6 my-6 rounded text-blue-700 border-slate-300 col-span-3">
                    <Typography
                        variant="body-4"
                        className="font-medium text-blue-700"
                    >
                        You don't have any requests.
                    </Typography>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    session: state.session,
});

const mapDispatchToProps = {
    getSessions,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestSessionTab);
