import { Button, Label, Modal, Typography } from "keep-react";
import React, { useEffect, useState } from "react";
import { UserPlus } from "phosphor-react";
import TextAreaComponent from "../FormElements/TextAreaComponent";
import StarRatings from "react-star-ratings";
import { addReview, getSessions } from "../../redux/actions/sessionAction";
import { connect } from "react-redux";
import Swal from "sweetalert2";

const AddReviewModal = ({
    showReviewModal,
    toogleReviewModal,
    session,
    sessionReducer,
    addReview,
    getSessions,
}) => {
    const [formData, setFormData] = useState({
        rating: 0,
        content: "",
    });

    const handleValueChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        addReview(formData, session._id, (response) => {
            Swal.fire("Success", response.message, "success");
            toogleReviewModal();
            setFormData({
                rating: 0,
                content: "",
            });
            getSessions({
                status: "previous",
            });
        });
    };

    return (
        <>
            <Modal
                icon={
                    <UserPlus
                        size={28}
                        color="#1B4DFF"
                        onClick={toogleReviewModal}
                    />
                }
                size="lg"
                show={showReviewModal}
                position="center"
            >
                <Modal.Header>
                    Review of Meeting with {session.other_user.name}
                </Modal.Header>
                <Modal.Body className="overflow-y-scroll custom-scrollbar max-h-[60vh]">
                    {!session.review_by_auth && (
                        <div className="my-4">
                            <div className="flex flex-col mb-4">
                                <Label value="Rating" />
                                <StarRatings
                                    rating={formData.rating}
                                    starDimension="20px"
                                    starSpacing="10px"
                                    starRatedColor="#FFD700"
                                    starHoverColor="#FFD700"
                                    name="rating"
                                    changeRating={(rating) => {
                                        const e = {
                                            target: {
                                                value: rating,
                                                name: "rating",
                                            },
                                        };
                                        handleValueChange(e);
                                    }}
                                />
                            </div>
                            <TextAreaComponent
                                label="Review"
                                placeholder="Tell us about the session"
                                containerClassName="mb-4"
                                rows="3"
                                value={formData.content}
                                name="content"
                                error={sessionReducer?.errors?.content?.message}
                                onChange={handleValueChange}
                            />
                        </div>
                    )}

                    {session.review_by_auth && (
                        <ShowReview
                            rating={session.review_by_auth.rating}
                            content={session.review_by_auth.content}
                            label="Review You Added"
                        />
                    )}

                    {session.review_for_auth && (
                        <ShowReview
                            rating={session.review_for_auth.rating}
                            content={session.review_for_auth.content}
                            label="Review You Received"
                        />
                    )}
                </Modal.Body>
                <Modal.Footer className="flex justify-end gap-6">
                    <Button
                        type="outlineGray"
                        size="sm"
                        onClick={toogleReviewModal}
                    >
                        Cancel
                    </Button>
                    {!session.review_by_auth && (
                        <Button
                            size="sm"
                            type="outlinePrimary"
                            onClick={handleSubmit}
                        >
                            Add Review
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

const ShowReview = ({ rating, content, label }) => (
    <div className="my-4">
        <Typography
            variant="heading-6"
            className="text-base tracking-normal font-medium mb-2"
        >
            {label}
        </Typography>
        <StarRatings
            rating={rating}
            starDimension="20px"
            starSpacing="10px"
            starRatedColor="#FFD700"
        />
        <Typography variant="body-6" className="text-xs tracking-normal mt-2">
            {content}
        </Typography>
    </div>
);

const mapStateToProps = (state) => ({
    sessionReducer: state.session,
});

const mapDispatchToProps = {
    addReview,
    getSessions,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReviewModal);
