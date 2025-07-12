import React, { useState } from "react";
import DateTimePickerComponent from "../../components/FormElements/DateTimePickerComponent";
import { Button, Modal } from "keep-react";
import { VideoCamera } from "phosphor-react";
import TextAreaComponent from "../FormElements/TextAreaComponent";
import { createSession } from "../../redux/actions/sessionAction";
import Loader from "../Loader/Loader";
import { connect } from "react-redux";
import Swal from "sweetalert2";

const CreateSessionModal = ({
    toogleShowCreateSessionModal,
    showCreateSessionModal,
    user_id,
    createSession,
    session,
}) => {
    const [formData, setFormData] = useState({
        start_time: "",
        end_time: "",
        description: "",
        invited_user_id: user_id,
    });

    const handleValueChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        createSession(formData, (response) => {
            Swal.fire("Success", response.message, "success");
            toogleShowCreateSessionModal();
            setFormData({
                start_time: "",
                end_time: "",
                description: "",
                invited_user_id: user_id,
            });
        });
    };

    return (
        <>
            <Modal
                icon={
                    <VideoCamera
                        size={28}
                        color="#1B4DFF"
                        onClick={toogleShowCreateSessionModal}
                    />
                }
                size="2xl"
                show={showCreateSessionModal}
                position="center"
            >
                <Modal.Header>
                    Are you sure you want to send Session Request?
                </Modal.Header>
                <Modal.Body className="overflow-y-scroll custom-scrollbar max-h-[60vh]">
                    <DateTimePickerComponent
                        label="Start Date Time"
                        placeholder="Enter Start Date and Time"
                        containerClassName="mb-4"
                        value={formData.start_time}
                        name="start_time"
                        onChange={handleValueChange}
                        minDate={new Date()}
                        error={
                            session?.errors?.start_time?.message
                        }
                    />
                    <DateTimePickerComponent
                        label="End Date Time"
                        placeholder="Enter End Date and Time"
                        containerClassName="mb-4"
                        value={formData.end_time}
                        name="end_time"
                        onChange={handleValueChange}
                        minDate={new Date()}
                        error={
                            session?.errors?.end_time?.message
                        }
                    />

                    <TextAreaComponent
                        label="Description"
                        placeholder="Description"
                        containerClassName="w-full"
                        rows="3"
                        value={formData.description}
                        name="description"
                        onChange={handleValueChange}
                        // error={user?.errors?.about?.message}
                    />
                </Modal.Body>
                <Modal.Footer className="flex justify-end gap-6">
                    <Button
                        type="outlineGray"
                        onClick={toogleShowCreateSessionModal}
                    >
                        Cancel
                    </Button>
                    <Button type="primary" onClick={handleSubmit}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            <Loader loading={session.loading} />
        </>
    );
};

const mapStateToProps = (state) => ({
    session: state.session,
});

const mapDispatchToProps = {
    createSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSessionModal);
