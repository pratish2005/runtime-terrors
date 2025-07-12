import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserReviews } from "../../redux/actions/userAction";
import { Avatar, Pagination, Typography } from "keep-react";
import Loader from "../Loader/Loader";
import StarRatings from "react-star-ratings";

const ShowReviews = ({ user_id, getUserReviews, reviews }) => {
    const [formData, setFormData] = useState({
        page: 1,
        limit: 10,
    });
    useEffect(() => {
        getUserReviews(formData, user_id);
    }, [user_id]);

    const handlePageChange = (page) => {
        const data = { ...formData };
        data.page = page;
        setFormData(data);
        getUserReviews(data, user_id);
    };
    return (
        <div className="w-4/5 md:w-3/4 mx-auto mb-6">
            <Typography
                variant="heading-6"
                className="font-medium text-2xl md:text-heading-6 mb-4"
            >
                Reviews
            </Typography>
            {reviews.user_reviews.map((review) => (
                <Review review={review} key={review._id} />
            ))}
            {reviews.user_reviews.length === 0 && (
                <div className="border border-dashed text-center p-6 my-6 rounded text-blue-600 border-slate-300 col-span-3">
                    <Typography
                        variant="paragraph-1"
                        className="font-medium text-blue-400"
                    >
                        No Reviews Yet.
                    </Typography>
                </div>
            )}
            {reviews.user_reviews.length > 0 && (
                <div className="m-full flex justify-center">
                    <Pagination
                        currentPage={formData.page}
                        onPageChange={handlePageChange}
                        totalPages={reviews.review_pagination.total_pages}
                        iconWithOutText
                        prevNextShape="roundSquare"
                    />
                </div>
            )}
            <Loader loading={reviews.loading} />
        </div>
    );
};

const Review = ({ review }) => (
    <div className="bg-white rounded-lg shadow-xl w-full border border-slate-50 mb-6 flex items-center">
        <div className="p-4">
            <div className="w-16 h-16 ">
                <Avatar
                    shape="circle"
                    img={
                        review.review_by.profile_picture ||
                        `https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg`
                    }
                    className="w-16 h-16 object-cover"
                />
            </div>
        </div>
        <div className="flex-1 p-4">
            <Typography variant="heading-6" className="font-medium text-xl">
                {review?.review_by?.name}
            </Typography>
            <div className="mb-2">
                <StarRatings
                    rating={review.rating}
                    starDimension="20px"
                    starSpacing="10px"
                    starRatedColor="#FFD700"
                />
            </div>
            <Typography variant="body-6" className="font-medium text-sm">
                {review?.content}
            </Typography>
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    reviews: state.users,
});

const mapDispatchToProps = {
    getUserReviews,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowReviews);
