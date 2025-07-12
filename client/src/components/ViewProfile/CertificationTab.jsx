import React from "react";
import TextContent from "./TextContent";
import moment from "moment";

const CertificationTab = ({ certifications, user }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications?.map((certification) => (
                <div
                    className="border border-slate-400 rounded-lg p-6"
                    key={certification._id}
                >
                    <TextContent
                        title="Certification Title :"
                        value={certification?.title}
                    />
                    <TextContent
                        title="Issuing Organization :"
                        value={certification?.issuing_organization}
                    />
                    <TextContent
                        title="Issuing Date :"
                        value={
                            certification?.issuing_date
                                ? moment(certification?.issuing_date).format(
                                      "D MMMM YYYY"
                                  )
                                : null
                        }
                    />
                    <TextContent
                        title="Expiry Date :"
                        value={
                            certification?.expiry_date
                                ? moment(certification?.expiry_date).format(
                                      "D MMMM YYYY"
                                  )
                                : null
                        }
                    />
                </div>
            ))}
            {certifications?.length === 0 && (
                <div className="col-span-2">
                    {user.name} has not added any certification details yet.
                </div>
            )}
        </div>
    );
};

export default CertificationTab;
