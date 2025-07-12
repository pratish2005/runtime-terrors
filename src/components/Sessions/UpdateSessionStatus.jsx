import { Button } from "keep-react";
import React from "react";
import Swal from "sweetalert2";
import { updateStatus, getSessions } from "../../redux/actions/sessionAction";
import { connect } from "react-redux";

const UpdateSessionStatus = ({ session, updateStatus, getSessions, auth }) => {
    const handleUpdateStatus = (status) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to ${
                status === "accepted" ? "accept" : "reject"
            } the request?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatus(
                    {
                        status,
                    },
                    session._id,
                    (response) => {
                        Swal.fire("Success", response.message, "success");
                        getSessions({
                            status: "requests",
                        });
                        getSessions({
                            status: "upcoming",
                        });
                    }
                );
            }
        });
    };
    return (
        <>
            {session.invited_user_id === auth.user._id && (
                <div className="flex gap-6">
                    <Button
                        size="xs"
                        type="primary"
                        color="success"
                        onClick={() => {
                            handleUpdateStatus("accepted");
                        }}
                    >
                        Accept
                    </Button>
                    <Button
                        size="xs"
                        type="primary"
                        color="error"
                        onClick={() => {
                            handleUpdateStatus("rejected");
                        }}
                    >
                        Reject
                    </Button>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = {
    updateStatus,
    getSessions,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateSessionStatus);
