import React from "react";
import { Link } from "react-router-dom";
import TextContent from "./TextContent";
import { Link as LinkIcon } from "phosphor-react";

const ProjectsTab = ({ projects, user }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects?.map((project) => (
                <div
                    className="border border-slate-400 rounded-lg p-6"
                    key={project._id}
                >
                    <div className="flex gap-2 items-center">
                        <TextContent title="Title :" value={project?.title} />
                        {project?.link && (
                            <Link
                                to={project?.link}
                                target="_blank"
                                className="mt-1"
                            >
                                <LinkIcon size={18} />
                            </Link>
                        )}
                    </div>
                    <TextContent title="Role :" value={project?.role} />
                    <TextContent
                        title="Skills Utilized :"
                        value={project?.skills?.join(", ")}
                    />
                    <TextContent
                        title="Description :"
                        value={project?.description}
                    />
                    <TextContent title="Outcome :" value={project?.outcome} />
                </div>
            ))}
            {projects?.length === 0 && (
                <div className="col-span-2">
                    {user.name} has not added any projects yet.
                </div>
            )}
        </div>
    );
};

export default ProjectsTab;
