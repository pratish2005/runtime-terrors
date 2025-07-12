import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import Loader from "../Loader/Loader";
import { Button, Typography } from "keep-react";

const InfiniteScrollComponent = ({
    fetchMoreData,
    hasMore,
    endMessage,
    children,
    containerClasses,
    isLoading,
    reverse = false,
    scrollRef = window,
    loadMoreButton = false,
}) => {
    const containerRef = useRef(null);

    const checkIfEdgeReached = () => {
        const container = containerRef.current;
        if (!container) return false;

        if (reverse) {
            return scrollRef.scrollTop <= 100;
        } else {
            const rect = container.getBoundingClientRect();
            return rect.bottom <= window.innerHeight;
        }
    };

    const handleScroll = async () => {
        if (checkIfEdgeReached() && !isLoading && hasMore && !loadMoreButton) {
            fetchMoreData();
        }
    };

    useEffect(() => {
        scrollRef.addEventListener("scroll", handleScroll);
        return () => scrollRef.removeEventListener("scroll", handleScroll);
    }, [isLoading, hasMore]);

    useEffect(() => {
        handleScroll();
    }, [children]);

    return (
        <div className={`flex ${reverse ? "flex-col-reverse" : "flex-col "}`}>
            <div
                className={twMerge(
                    `infinite-scroll-container`,
                    containerClasses
                )}
                ref={containerRef}
            >
                {loadMoreButton && hasMore && (
                    <Button
                        type="outline"
                        className="text-blue-700 text-center cursor-pointer mx-auto"
                        onClick={fetchMoreData}
                    >
                        Load More
                    </Button>
                )}
                {!hasMore && reverse && endMessage}

                {children}

                {!hasMore && !reverse && endMessage}
            </div>
            <div className={`my-6 ${isLoading ? "" : "hidden"}`}>
                <Loader loading={isLoading} fullPageLoader={false} />
            </div>
        </div>
    );
};

export default InfiniteScrollComponent;
