import React from "react";
import TextContent from "./TextContent";
import moment from "moment";

const EducationTab = ({ education, user }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education?.map((education) => (
                <div
                    className="border border-slate-400 rounded-lg p-6"
                    key={education._id}
                >
                    <TextContent
                        title="Degree or Program :"
                        value={education?.degree}
                    />
                    <TextContent
                        title="Instituation Name :"
                        value={education?.institute_name}
                    />
                    <TextContent
                        title="Start Date :"
                        value={
                            education?.start_date
                                ? moment(education?.start_date).format(
                                      "D MMMM YYYY"
                                  )
                                : null
                        }
                    />
                    <TextContent
                        title="End Date :"
                        value={
                            education?.end_date
                                ? moment(education?.end_date).format(
                                      "D MMMM YYYY"
                                  )
                                : null
                        }
                    />
                </div>
            ))}
            {education?.length === 0 && (
                <div className="col-span-2">
                    {user.name} has not added any education details yet.
                </div>
            )}
        </div>
    );
};

export default EducationTab;
