import { Typography } from "keep-react";
import React from "react";

const TextContent = ({ title, value }) => (
    <div className="my-1 md:flex gap-2 items-center mb-4 md:mb-0 flex-wrap">
        <Typography
            variant="heading-6"
            className="text-base text-slate-700 font-bold"
        >
            {title}
        </Typography>
        <Typography variant="heading-6" className="text-base text-slate-700">
            {value ? value : "--"}
        </Typography>
    </div>
);

export default TextContent;
