import { Spinner } from "keep-react";
import React from "react";

const Loader = ({ loading, fullPageLoader = true }) => {
    return (
        <div
            className={`${
                fullPageLoader
                    ? `fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-[999999] `
                    : ""
            } flex justify-center items-center ${loading ? "flex" : "hidden"}`}
        >
            {/* <div className="animate-spin rounded-full border-t-4 border-white h-16 w-16"></div> */}
            <Spinner color="info" size="xl" />
        </div>
    );
};

export default Loader;
