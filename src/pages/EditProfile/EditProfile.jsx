import {
    Avatar,
    Breadcrumb,
    Button,
    Popover,
    Statistic,
    Typography,
} from "keep-react";
import React, { useEffect, useRef, useState } from "react";
import { CaretRight, Camera, Plus, Trash, Info } from "phosphor-react";
import generateUrl from "../../utils/routes";
import banner from "../../assets/images/profile/banner.svg";
import TextInputComponent from "../../components/FormElements/TextInputComponent";
import TextAreaComponent from "../../components/FormElements/TextAreaComponent";
import DatePickerComponent from "../../components/FormElements/DatePickerComponent";
import { connect } from "react-redux";
import SelectAsyncComponent from "../../components/FormElements/SelectAsyncComponent";
import skillSet from "../../utils/skillSet";
import hobbySet from "../../utils/hobbySet";
import moment from "moment";
import {
    updateUserProfile,
    updateUserProfilePicture,
} from "../../redux/actions/authAction";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader";
import SkillScoreStatistic from "../../components/SkillScoreStatics/SkillScoreStatistic";
import { Link } from "react-router-dom";

const EditProfile = ({ user, updateUserProfile, updateUserProfilePicture }) => {
    const personalInformationRef = useRef();
    const [personalInformationHeight, setPersonalInformationHeight] =
        useState(0);

    const projectsSet = {
        title: "",
        link: "",
        role: "",
        skills: [],
        description: "",
        outcome: "",
    };
    const educationSet = {
        degree: "",
        institute_name: "",
        start_date: "",
        end_date: "",
    };
    const certificationSet = {
        title: "",
        issuing_organization: "",
        link: "",
        issuing_date: "",
        expiry_date: "",
    };
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        city: "",
        state: "",
        about: "",
        professional_information: {
            role: "",
            industry: "",
            skills_to_offer: [],
            skills_seeking: [],
        },
        interests: {
            short_goal: "",
            long_goal: "",
            hobbies: [],
        },
        projects: [],
        education: [],
        certifications: [],
    });

    const handleAddNew = (key) => {
        const setsMapping = {
            projects: projectsSet,
            education: educationSet,
            certifications: certificationSet,
        };
        setFormData((prev) => {
            return {
                ...prev,
                [key]: [...prev[key], { ...setsMapping[key] }],
            };
        });
    };

    const handleDelete = (key, index) => {
        setFormData((prev) => {
            const updatedArray = prev[key].filter(
                (item, item_index) => index !== item_index
            );

            return {
                ...prev,
                [key]: updatedArray,
            };
        });
    };

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setPersonalInformationHeight(entry.target.offsetHeight);
            }
        });

        if (personalInformationRef.current) {
            resizeObserver.observe(personalInformationRef.current);
        }

        return () => {
            if (personalInformationRef.current) {
                resizeObserver.unobserve(personalInformationRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (user.user) {
            const user_temp = user.user;
            const data = {
                name: user_temp?.name || "",
                email: user_temp?.email || "",
                city: user_temp?.city || "",
                state: user_temp?.state || "",
                about: user_temp?.about || "",
                professional_information: {
                    role: user_temp?.professional_information?.role || "",
                    industry:
                        user_temp?.professional_information?.industry || "",
                    skills_to_offer:
                        user_temp?.professional_information?.skills_to_offer ||
                        [],
                    skills_seeking:
                        user_temp?.professional_information?.skills_seeking ||
                        [],
                },
                interests: {
                    short_goal: user_temp?.interests?.short_goal || "",
                    long_goal: user_temp?.interests?.long_goal || "",
                    hobbies: user_temp?.interests?.hobbies || [],
                },
                projects: user_temp.projects.map((project) => ({
                    title: project?.title || "",
                    link: project?.link || "",
                    role: project?.role || "",
                    skills: project?.skills || "",
                    description: project?.description || "",
                    outcome: project?.outcome || "",
                })),
                education: user_temp.education.map((education) => ({
                    degree: education?.degree || "",
                    institute_name: education?.institute_name || "",
                    start_date: education?.start_date || "",
                    end_date: education?.end_date || "",
                })),
                certifications: user_temp.certifications.map(
                    (certification) => ({
                        title: certification?.title || "",
                        issuing_organization:
                            certification?.issuing_organization || "",
                        link: certification?.link || "",
                        issuing_date: certification?.issuing_date || "",
                        expiry_date: certification?.expiry_date || "",
                    })
                ),
            };
            setFormData(data);
        }
    }, [user.user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => {
            // Split the field name by '.' to support nested paths
            const keys = name.split(".");

            // Function to recursively update the state
            const updateNestedState = (data, keys, value) => {
                // Clone the current level of the object or array
                let current = Array.isArray(data) ? [...data] : { ...data };

                // Extract the first key
                let key = keys[0];

                // If this is the final key, update the value
                if (keys.length === 1) {
                    if (key.includes("[")) {
                        // Handle array indexes, e.g., 'projects[0].title'
                        const [arrayKey, arrayIndex] = key
                            .split(/\[|\]/)
                            .filter(Boolean);
                        current[arrayKey][arrayIndex] = value;
                    } else {
                        current[key] = value;
                    }
                } else {
                    // Recursively call the function for nested objects/arrays
                    current[key] = updateNestedState(
                        current[key],
                        keys.slice(1),
                        value
                    );
                }

                return current;
            };

            // Use the recursive function to update the state
            return updateNestedState(prevFormData, keys, value);
        });
    };

    const handleLoadSkillOptions = (search, callback) => {
        const result = skillSet
            .filter((i) => i.toLowerCase().includes(search.toLowerCase()))
            .map((option) => ({
                label: option,
                value: option,
            }));
        callback(result);
    };

    const handleLoadHobbyOptions = (search, callback) => {
        const result = hobbySet
            .filter((i) => i.toLowerCase().includes(search.toLowerCase()))
            .map((option) => ({
                label: option,
                value: option,
            }));
        callback(result);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserProfile(formData, (response) => {
            Swal.fire("Success", response.message, "success");
        });
    };

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        if (file.type.startsWith("image/")) {
            updateUserProfilePicture(
                {
                    content_type: "image",
                    profile_picture: file,
                },
                (response) => {
                    Swal.fire("Success", response.message, "success");
                }
            );
        } else {
            Swal.fire("Error", "Please upload a valid image file", "error");
        }
    };

    return (
        <div className="">
            <div className="w-full bg-white px-6 flex justify-between items-center shadow-xl ">
                {/*  sticky top-[76px] z-50 */}
                <Breadcrumb
                    separatorIcon={<CaretRight size={20} color="#AFBACA" />}
                >
                    <Breadcrumb.Item active={true}>
                        <Link to={generateUrl("profile")}>Profile</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <Button
                        size="sm"
                        type="primary"
                        onClick={handleSubmit}
                        className="my-2 py-0 px-8 "
                        pill={true}
                    >
                        Save
                    </Button>
                </div>
            </div>
            <div className="">
                <div style={{ height: `${personalInformationHeight + 128}px` }}>
                    <div className={`relative`}>
                        <img
                            src={banner}
                            className="w-full object-cover h-64"
                        />
                        <div className="flex justify-center items-center">
                            <div
                                className="w-4/5 md:w-3/4 absolute top-1/2"
                                ref={personalInformationRef}
                            >
                                <div className="relative bg-white rounded-lg shadow-xl  w-full mb-6 border border-slate-50">
                                    <div className="absolute left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                        <div className="relative">
                                            <div className="w-40 h-40">
                                                <Avatar
                                                    shape="circle"
                                                    img={
                                                        user?.user
                                                            ?.profile_picture ||
                                                        `https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg`
                                                    }
                                                    className="w-40 h-40 object-cover"
                                                />
                                            </div>
                                            <label
                                                htmlFor="change_profile"
                                                className="bg-[#E9EFF6] rounded-full flex items-center justify-center absolute p-2 right-0 bottom-0 cursor-pointer"
                                            >
                                                <Camera
                                                    size={32}
                                                    color="#000000"
                                                />
                                            </label>
                                            <input
                                                type="file"
                                                className="hidden"
                                                id="change_profile"
                                                onChange={handleUploadImage}
                                            />
                                        </div>
                                    </div>
                                    <div className="px-6 pb-6 pt-24 md:grid md:grid-cols-2 md:gap-6">
                                        <TextInputComponent
                                            label="Full Name"
                                            placeholder="Enter your full name"
                                            containerClassName="mb-6 md:mb-0"
                                            value={formData.name}
                                            name="name"
                                            handleOnChange={handleChange}
                                            error={user?.errors?.name?.message}
                                        />
                                        <TextInputComponent
                                            label="Email"
                                            placeholder="Enter your email"
                                            containerClassName="mb-6 md:mb-0"
                                            value={formData.email}
                                            name="email"
                                            handleOnChange={handleChange}
                                            error={user?.errors?.email?.message}
                                        />
                                        <TextInputComponent
                                            label="City"
                                            placeholder="Select your city"
                                            containerClassName="mb-6 md:mb-0"
                                            value={formData.city}
                                            name="city"
                                            error={user?.errors?.city?.message}
                                            handleOnChange={handleChange}
                                        />
                                        <TextInputComponent
                                            label="State"
                                            placeholder="Select your state"
                                            containerClassName="mb-6 md:mb-0"
                                            value={formData.state}
                                            name="state"
                                            error={user?.errors?.state?.message}
                                            handleOnChange={handleChange}
                                        />
                                        <TextAreaComponent
                                            label="Tell us about yourself"
                                            placeholder="Tell us about yourself"
                                            containerClassName="col-span-2"
                                            rows="3"
                                            value={formData.about}
                                            name="about"
                                            error={user?.errors?.about?.message}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="pb-6 px-6">
                                        <div className="font-medium text-2xl md:text-heading-6 flex items-center gap-4">
                                            Skill Scores
                                            <Popover
                                                trigger="hover"
                                                className="shadow-2xl"
                                                icon={<></>}
                                            >
                                                <Popover.Description>
                                                    AI generates these scores
                                                    according to the details
                                                    included in your profile,
                                                    like projects, educational
                                                    background, and
                                                    certifications.
                                                </Popover.Description>
                                                <Popover.Action>
                                                    <Info
                                                        size={35}
                                                        className="md:mt-1"
                                                    />
                                                </Popover.Action>
                                            </Popover>
                                        </div>
                                    </div>
                                    {(user?.user?.professional_information
                                        ?.skills_to_offer?.length === 0 ||
                                        !user?.user?.professional_information
                                            ?.skills_to_offer) && (
                                        <div className=" px-6 mb-6">
                                            <p className="font-medium text-orange-500">
                                                Looks like you haven't added any
                                                skills yet. Show off your
                                                talents by adding your skills
                                                now!
                                            </p>
                                        </div>
                                    )}
                                    {user?.user?.professional_information
                                        ?.skills_to_offer?.length > 0 &&
                                        user?.user?.skill_scores?.length ===
                                            0 && (
                                            <div className=" px-6 mb-6">
                                                <p className="font-medium text-blue-500">
                                                    Great job on updating your
                                                    profile! We're now
                                                    processing your information
                                                    to provide personalized
                                                    scores. Stay tuned!
                                                </p>
                                            </div>
                                        )}
                                    {user?.user?.skill_scores?.length > 0 && (
                                        <div className="px-6 flex flex-wrap gap-6 mb-6">
                                            {user?.user?.skill_scores?.map(
                                                (skill) => (
                                                    <SkillScoreStatistic
                                                        skill={skill}
                                                        key={skill.skill_name}
                                                    />
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <div className="bg-white rounded-lg shadow-xl w-4/5 md:w-3/4 border border-slate-50 mb-6">
                        <div className="pt-6 px-6">
                            <Typography
                                variant="heading-6"
                                className="font-medium text-2xl md:text-heading-6"
                            >
                                Professional Information
                            </Typography>
                        </div>
                        <div className="p-6 md:grid md:grid-cols-2 md:gap-6">
                            <TextInputComponent
                                label="Current Occupation/Role"
                                placeholder="Enter your Current Occupation/Role"
                                containerClassName="mb-6 md:mb-0"
                                value={formData.professional_information.role}
                                name="professional_information.role"
                                handleOnChange={handleChange}
                                error={
                                    user?.errors?.professional_information?.role
                                        ?.message
                                }
                            />
                            <TextInputComponent
                                label="Industry/Sector"
                                placeholder="Select Industry/Sector"
                                containerClassName="mb-6 md:mb-0"
                                value={
                                    formData.professional_information.industry
                                }
                                name="professional_information.industry"
                                handleOnChange={handleChange}
                                error={
                                    user?.errors?.professional_information
                                        ?.industry?.message
                                }
                            />
                            <SelectAsyncComponent
                                label="Skills to Offer"
                                placeholder="Select Skills"
                                containerClassName="mb-6 md:mb-0"
                                defaultOptions={[
                                    ...new Set([
                                        ...skillSet.slice(0, 10),
                                        ...formData.professional_information
                                            .skills_to_offer,
                                    ]),
                                ]}
                                value={
                                    formData.professional_information
                                        .skills_to_offer
                                }
                                name="professional_information.skills_to_offer"
                                isMulti={true}
                                cacheOptions
                                onChange={handleChange}
                                loadOptions={handleLoadSkillOptions}
                                error={
                                    user?.errors?.professional_information
                                        ?.skills_to_offer?.message
                                }
                            />
                            <SelectAsyncComponent
                                label="Skills Seeking"
                                placeholder="Select Skills"
                                containerClassName=""
                                defaultOptions={[
                                    ...new Set([
                                        ...skillSet.slice(0, 10),
                                        ...formData.professional_information
                                            .skills_seeking,
                                    ]),
                                ]}
                                value={
                                    formData.professional_information
                                        .skills_seeking
                                }
                                name="professional_information.skills_seeking"
                                isMulti={true}
                                cacheOptions
                                onChange={handleChange}
                                loadOptions={handleLoadSkillOptions}
                                error={
                                    user?.errors?.professional_information
                                        ?.skills_seeking?.message
                                }
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-xl w-4/5 md:w-3/4 border border-slate-50 mb-6">
                        <div className="pt-6 px-6">
                            <Typography
                                variant="heading-6"
                                className="font-medium text-2xl md:text-heading-6"
                            >
                                Interests and Goals
                            </Typography>
                        </div>
                        <div className="p-6 md:grid md:grid-cols-2 md:gap-6">
                            <TextAreaComponent
                                label="Short Term Goal"
                                placeholder="Tell us about your short term goal"
                                containerClassName="mb-6 md:mb-0"
                                rows="4"
                                value={formData.interests.short_goal}
                                name="interests.short_goal"
                                onChange={handleChange}
                                error={
                                    user?.errors?.interests?.short_goal?.message
                                }
                            />
                            <TextAreaComponent
                                label="Long Term Goal"
                                placeholder="Tell us about your long term goal"
                                containerClassName="mb-6 md:mb-0"
                                rows="4"
                                value={formData.interests.long_goal}
                                name="interests.long_goal"
                                onChange={handleChange}
                                error={
                                    user?.errors?.interests?.long_goal?.message
                                }
                            />
                            <SelectAsyncComponent
                                label="Hobbies and Interests"
                                placeholder="Enter your Hobbies and Interests"
                                containerClassName="col-span-2"
                                defaultOptions={[
                                    ...new Set([
                                        ...hobbySet.slice(0, 10),
                                        ...formData.interests.hobbies,
                                    ]),
                                ]}
                                value={formData.interests.hobbies}
                                name="interests.hobbies"
                                isMulti={true}
                                cacheOptions
                                onChange={handleChange}
                                loadOptions={handleLoadHobbyOptions}
                                error={
                                    user?.errors?.interests?.hobbies?.message
                                }
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-xl w-4/5 md:w-3/4 border border-slate-50 mb-6 px-6 pt-6">
                        <div className="flex justify-between items-center">
                            <Typography
                                variant="heading-6"
                                className="font-medium text-2xl md:text-heading-6"
                            >
                                Projects
                            </Typography>
                            <div>
                                <Button
                                    size="xs"
                                    type="default"
                                    onClick={(e) => {
                                        handleAddNew("projects");
                                    }}
                                >
                                    <span className="pr-2">
                                        <Plus size={18} />
                                    </span>
                                    Add
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col divide-y">
                            {formData.projects.map((project, index) => (
                                <div key={index}>
                                    <div className="py-6 md:grid md:grid-cols-2 md:gap-6">
                                        <TextInputComponent
                                            label="Title"
                                            placeholder="Enter your project title"
                                            containerClassName="mb-6 md:mb-0"
                                            value={project.title}
                                            name={`projects.${index}.title`}
                                            handleOnChange={handleChange}
                                            error={
                                                user?.errors?.projects?.[index]
                                                    ?.title?.message
                                            }
                                        />
                                        <TextInputComponent
                                            label="Link"
                                            placeholder="Enter your project link"
                                            containerClassName="mb-6 md:mb-0"
                                            value={project.link}
                                            name={`projects.${index}.link`}
                                            handleOnChange={handleChange}
                                            error={
                                                user?.errors?.projects?.[index]
                                                    ?.link?.message
                                            }
                                        />
                                        <TextInputComponent
                                            label="Role"
                                            placeholder="Enter your role for this project"
                                            containerClassName="mb-6 md:mb-0"
                                            value={project.role}
                                            name={`projects.${index}.role`}
                                            handleOnChange={handleChange}
                                            error={
                                                user?.errors?.projects?.[index]
                                                    ?.role?.message
                                            }
                                        />
                                        <SelectAsyncComponent
                                            label="Skills Utilized"
                                            placeholder="Select the skills that you used in this project"
                                            containerClassName="mb-6 md:mb-0"
                                            defaultOptions={[
                                                ...new Set([
                                                    ...skillSet.slice(0, 10),
                                                    ...project.skills,
                                                ]),
                                            ]}
                                            value={project.skills}
                                            name={`projects.${index}.skills`}
                                            isMulti={true}
                                            cacheOptions
                                            onChange={handleChange}
                                            loadOptions={handleLoadSkillOptions}
                                            error={
                                                user?.errors?.projects?.[index]
                                                    ?.skills?.message
                                            }
                                        />
                                        <TextAreaComponent
                                            label="Description"
                                            placeholder="Tell us about your project"
                                            containerClassName="mb-6 md:mb-0"
                                            rows="4"
                                            value={project.description}
                                            name={`projects.${index}.description`}
                                            onChange={handleChange}
                                            error={
                                                user?.errors?.projects?.[index]
                                                    ?.description?.message
                                            }
                                        />
                                        <TextAreaComponent
                                            label="Outcome"
                                            placeholder="Tell us about what was achieved in this project"
                                            containerClassName=""
                                            rows="4"
                                            value={project.outcome}
                                            name={`projects.${index}.outcome`}
                                            onChange={handleChange}
                                            error={
                                                user?.errors?.projects?.[index]
                                                    ?.outcome?.message
                                            }
                                        />
                                    </div>
                                    <div className="pb-6 flex justify-end">
                                        <Button
                                            size="xs"
                                            type="default"
                                            color="error"
                                            onClick={(e) => {
                                                handleDelete("projects", index);
                                            }}
                                        >
                                            <span className="pr-2">
                                                <Trash size={18} />
                                            </span>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {formData.projects.length === 0 && (
                                <div className="border border-dashed text-center p-6 my-6 rounded text-blue-600 border-slate-200">
                                    <Typography
                                        variant="paragraph-1"
                                        className="font-medium text-blue-400"
                                    >
                                        Please add some projects.
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-xl w-4/5 md:w-3/4 border border-slate-50 mb-6 px-6 pt-6">
                        <div className="flex justify-between items-center">
                            <Typography
                                variant="heading-6"
                                className="font-medium text-2xl md:text-heading-6"
                            >
                                Education
                            </Typography>
                            <div>
                                <Button
                                    size="xs"
                                    type="default"
                                    onClick={(e) => {
                                        handleAddNew("education");
                                    }}
                                >
                                    <span className="pr-2">
                                        <Plus size={18} />
                                    </span>
                                    Add
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col divide-y">
                            {formData.education.map((education, index) => (
                                <div key={index}>
                                    <div className="py-6 md:grid md:grid-cols-4 md:gap-6">
                                        <TextInputComponent
                                            label="Degree or Program"
                                            placeholder="Enter Degree or Program Name"
                                            containerClassName="mb-6 md:mb-0 col-span-4"
                                            value={education.degree}
                                            name={`education.${index}.degree`}
                                            handleOnChange={handleChange}
                                            error={
                                                user?.errors?.education?.[index]
                                                    ?.degree?.message
                                            }
                                        />
                                        <TextInputComponent
                                            label="Institution Name"
                                            placeholder="Enter Institution Name"
                                            containerClassName="mb-6 md:mb-0 col-span-2"
                                            value={education.institute_name}
                                            name={`education.${index}.institute_name`}
                                            handleOnChange={handleChange}
                                            error={
                                                user?.errors?.education?.[index]
                                                    ?.institute_name?.message
                                            }
                                        />
                                        <DatePickerComponent
                                            label="Start Date"
                                            placeholder="Enter Start Date"
                                            containerClassName="mb-6 md:mb-0"
                                            value={
                                                education?.start_date
                                                    ? moment(
                                                          education.start_date
                                                      ).format("YYYY-MM-DD")
                                                    : ""
                                            }
                                            name={`education.${index}.start_date`}
                                            onChange={handleChange}
                                            error={
                                                user?.errors?.education?.[index]
                                                    ?.start_date?.message
                                            }
                                        />
                                        <DatePickerComponent
                                            label="End Date"
                                            placeholder="Enter End Date"
                                            containerClassName=""
                                            value={
                                                education?.end_date
                                                    ? moment(
                                                          education.end_date
                                                      ).format("YYYY-MM-DD")
                                                    : ""
                                            }
                                            name={`education.${index}.end_date`}
                                            onChange={handleChange}
                                            error={
                                                user?.errors?.education?.[index]
                                                    ?.end_date?.message
                                            }
                                        />
                                    </div>
                                    <div className="pb-6 flex justify-end">
                                        <Button
                                            size="xs"
                                            type="default"
                                            color="error"
                                            onClick={(e) => {
                                                handleDelete(
                                                    "education",
                                                    index
                                                );
                                            }}
                                        >
                                            <span className="pr-2">
                                                <Trash size={18} />
                                            </span>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {formData.education.length === 0 && (
                                <div className="border border-dashed text-center p-6 my-6 rounded text-blue-600 border-slate-200">
                                    <Typography
                                        variant="paragraph-1"
                                        className="font-medium text-blue-400"
                                    >
                                        Please add your education details.
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-xl w-4/5 md:w-3/4 border border-slate-50 mb-6 px-6 pt-6">
                        <div className="flex justify-between items-center">
                            <Typography
                                variant="heading-6"
                                className="font-medium text-2xl md:text-heading-6"
                            >
                                Certifications
                            </Typography>
                            <div>
                                <Button
                                    size="xs"
                                    type="default"
                                    onClick={(e) => {
                                        handleAddNew("certifications");
                                    }}
                                >
                                    <span className="pr-2">
                                        <Plus size={18} />
                                    </span>
                                    Add
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col divide-y">
                            {formData.certifications.map(
                                (certification, index) => (
                                    <div key={index}>
                                        <div className="py-6 md:grid md:grid-cols-2 md:gap-6">
                                            <TextInputComponent
                                                label="Certification Title"
                                                placeholder="Enter Certification Title"
                                                containerClassName="mb-6 md:mb-0 col-span-2"
                                                value={certification.title}
                                                name={`certifications.${index}.title`}
                                                handleOnChange={handleChange}
                                                error={
                                                    user?.errors
                                                        ?.certifications?.[
                                                        index
                                                    ]?.title?.message
                                                }
                                            />
                                            <TextInputComponent
                                                label="Issuing Organization"
                                                placeholder="Enter Issuing Organization"
                                                containerClassName="mb-6 md:mb-0"
                                                value={
                                                    certification.issuing_organization
                                                }
                                                name={`certifications.${index}.issuing_organization`}
                                                handleOnChange={handleChange}
                                                error={
                                                    user?.errors
                                                        ?.certifications?.[
                                                        index
                                                    ]?.issuing_organization
                                                        ?.message
                                                }
                                            />
                                            <TextInputComponent
                                                label="Certification ID or Link"
                                                placeholder="Enter Certification ID or Link"
                                                containerClassName="mb-6 md:mb-0"
                                                value={certification.link}
                                                name={`certifications.${index}.link`}
                                                handleOnChange={handleChange}
                                                error={
                                                    user?.errors
                                                        ?.certifications?.[
                                                        index
                                                    ]?.link?.message
                                                }
                                            />
                                            <DatePickerComponent
                                                label="Issuing Date"
                                                placeholder="Enter Issuing Date"
                                                containerClassName="mb-6 md:mb-0"
                                                value={
                                                    certification?.issuing_date
                                                        ? moment(
                                                              certification.issuing_date
                                                          ).format("YYYY-MM-DD")
                                                        : ""
                                                }
                                                name={`certifications.${index}.issuing_date`}
                                                onChange={handleChange}
                                                error={
                                                    user?.errors
                                                        ?.certifications?.[
                                                        index
                                                    ]?.issuing_date?.message
                                                }
                                            />
                                            <DatePickerComponent
                                                label="Expiry Date"
                                                placeholder="Enter Expiry Date"
                                                containerClassName=""
                                                value={
                                                    certification?.expiry_date
                                                        ? moment(
                                                              certification.expiry_date
                                                          ).format("YYYY-MM-DD")
                                                        : ""
                                                }
                                                name={`certifications.${index}.expiry_date`}
                                                onChange={handleChange}
                                                error={
                                                    user?.errors
                                                        ?.certifications?.[
                                                        index
                                                    ]?.expiry_date?.message
                                                }
                                            />
                                        </div>
                                        <div className="pb-6 flex justify-end">
                                            <Button
                                                size="xs"
                                                type="default"
                                                color="error"
                                                onClick={(e) => {
                                                    handleDelete(
                                                        "certifications",
                                                        index
                                                    );
                                                }}
                                            >
                                                <span className="pr-2">
                                                    <Trash size={18} />
                                                </span>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                )
                            )}
                            {formData.certifications.length === 0 && (
                                <div className="border border-dashed text-center p-6 my-6 rounded text-blue-600 border-slate-200">
                                    <Typography
                                        variant="paragraph-1"
                                        className="font-medium text-blue-400"
                                    >
                                        Please add your certifications details.
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Loader loading={user.loading} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth,
});

const mapDispatchToProps = {
    updateUserProfile,
    updateUserProfilePicture,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
