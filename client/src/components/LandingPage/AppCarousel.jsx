import React from "react";
import homePageImage from "../../assets/images/landing_page/homepage.png";
import viewProfile from "../../assets/images/landing_page/view_profile.png";
import editProfile from "../../assets/images/landing_page/edit_profile.png";
import messages from "../../assets/images/landing_page/messages.png";
import { Carousel } from "react-responsive-carousel";
import { CaretLeft, CaretRight } from "phosphor-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const AppCarousel = () => {
    return (
        <div className="mx-6 my-10 w-[95%] md:w-4/5 lg:w-3/4 xl:w-3/5 shadow">
            <Carousel
                autoPlay
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                renderArrowPrev={(handleClick) => {
                    return (
                        <button
                            className="absolute top-0 bottom-0 z-50 flex items-center hover:bg-metal-500 hover:bg-opacity-50"
                            onClick={handleClick}
                        >
                            <CaretLeft size={28} />
                        </button>
                    );
                }}
                renderArrowNext={(handleClick) => {
                    return (
                        <button
                            className="absolute top-0 bottom-0 right-0 z-50 flex items-center hover:bg-metal-500 hover:bg-opacity-50"
                            onClick={handleClick}
                        >
                            <CaretRight size={28} />
                        </button>
                    );
                }}
                renderIndicator={(handleClick, isSelected) => {
                    return (
                        <li className="inline-block mx-2">
                            <Dot
                                handleClick={handleClick}
                                isSelected={isSelected}
                            />
                        </li>
                    );
                }}
            >
                <Image src={homePageImage} />
                <Image src={viewProfile} />
                <Image src={editProfile} />
                <Image src={messages} />
            </Carousel>
        </div>
    );
};

const Image = ({ src }) => <img src={src} className="w-full" />;

const Dot = ({ handleClick, isSelected }) => (
    <button
        className={`h-3 w-3 border border-gray-500 rounded-full ${
            isSelected ? "bg-gray-500" : ""
        }`}
        onClick={handleClick}
    ></button>
);

export default AppCarousel;
