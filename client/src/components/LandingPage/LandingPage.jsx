import { Avatar, Button, Card, Timeline, Typography } from "keep-react";
import React, { useEffect } from "react";
import howWeWorkImage from "../../assets/images/landing_page/how_we_work_image.svg";
import anand from "../../assets/images/landing_page/team_anand.jpg";
import { getAuthUserProfile } from "../../redux/actions/authAction";
import {
    Handshake,
    ChartBar,
    MagnifyingGlass,
    Star,
    VideoCamera,
    Calendar,
    Chats,
    UserPlus,
    CalendarBlank,
    LinkedinLogo,
    InstagramLogo,
} from "phosphor-react";
import { Link as ScrollLink } from "react-scroll";
import { connect } from "react-redux";
import ContactUsForm from "./ContactUsForm";
import AppCarousel from "./AppCarousel";

const LandingPage = ({ getAuthUserProfile }) => {
    const key_features = [
        {
            id: 1,
            title: "Personalized Skill Matching",
            description:
                "Find your perfect skill exchange partner with our AI-driven matching system, tailored to your expertise and learning goals.",
            icon: <Handshake size={28} color="#3D4A5C" />,
        },
        {
            id: 2,
            title: "Skill-Based Scoring",
            description:
                "Receive a dynamic score for each skill you offer, based on your education, projects, and certifications, ensuring credible and beneficial exchanges.",
            icon: <ChartBar size={28} color="#3D4A5C" />,
        },
        {
            id: 3,
            title: "Advanced Search Filters",
            description:
                "Effortlessly find users by specifying skills you offer and seek. Our platform sorts users by relevance to your needs, simplifying your search.",
            icon: <MagnifyingGlass size={28} color="#3D4A5C" />,
        },
        {
            id: 4,
            title: "Real-Time Messaging",
            description:
                "Connect instantly with potential skill exchange partners through our platform’s built-in messaging system, facilitating immediate communication.",
            icon: <Chats size={28} color="#3D4A5C" />,
        },
        {
            id: 5,
            title: "Interactive Session Scheduling",
            description:
                "Schedule learning sessions at your convenience. Select dates and times that work for both parties with just a few clicks.",
            icon: <Calendar size={28} color="#3D4A5C" />,
        },
        {
            id: 6,
            title: "Integrated Video Meetings",
            description:
                "Upon session confirmation, receive a Google Meet link for your virtual meet-up, making remote learning seamless and accessible.",
            icon: <VideoCamera size={28} color="#3D4A5C" />,
        },
        {
            id: 7,
            title: "Feedback and Reviews",
            description:
                "After each session, provide and receive feedback to ensure the community benefits from honest, constructive reviews.",
            icon: <Star size={28} color="#3D4A5C" />,
        },
    ];

    const how_it_works = [
        {
            id: 1,
            title: "Register & Profile Setup",
            description:
                "Begin by signing up with your email, name, and password. Complete your profile by detailing your skills, education, and certifications.",
            icon: <UserPlus size={16} color="#3D4A5C" />,
        },
        {
            id: 2,
            title: "Skill Evaluation",
            description:
                "Our platform analyzes your profile to assign scores to your offered skills, helping others understand your expertise level.",
            icon: <ChartBar size={16} color="#3D4A5C" />,
        },
        {
            id: 3,
            title: "Discover Matches",
            description:
                "Use our search feature to find users offering skills you want to learn and seeking skills you offer, sorted by skill scores for best matches.",
            icon: <MagnifyingGlass size={16} color="#3D4A5C" />,
        },
        {
            id: 4,
            title: "Connect & Communicate",
            description:
                "When you find a match, message them directly on the platform to express interest and discuss potential skill exchange.",
            icon: <Chats size={16} color="#3D4A5C" />,
        },
        {
            id: 5,
            title: "Schedule & Meet",
            description:
                "Agree on a session time, schedule it through the platform, and receive a Google Meet link for your virtual exchange.",
            icon: <CalendarBlank size={16} color="#3D4A5C" />,
        },
        {
            id: 6,
            title: "Feedback",
            description:
                "After your session, update the session status and share reviews to help maintain a trustworthy community.",
            icon: <Star size={16} color="#3D4A5C" />,
        },
    ];
    useEffect(() => {
        getAuthUserProfile();
    }, []);
    return (
        <div className="bg-white min-h-screen">
            <div className="bg-header_background xl:bg-contain bg-top bg-no-repeat min-h-screen pt-10">
                <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[40%] mx-auto">
                    <Typography
                        variant="heading-4"
                        className="text-center font-bold mb-10 leading-relaxed"
                        data-aos="fade-up"
                    >
                        Empowering Growth Through{" "}
                        <span className="text-blue-500">
                            Sharing Knowledge.
                        </span>
                    </Typography>
                    <div className="flex gap-6 justify-center flex-col md:flex-row items-center" data-aos="fade-up" data-aos-delay="300">
                        <ScrollLink
                            to="key_features"
                            smooth={true}
                            duration={500}
                            offset={-76}
                        >
                            <Button
                                size="sm"
                                type="primary"
                                className="my-2 py-0 px-8 bg-blue-500"
                                pill={true}
                            >
                                Key Features
                            </Button>
                        </ScrollLink>
                        <ScrollLink
                            to="how_it_works"
                            smooth={true}
                            duration={500}
                            offset={-76}
                        >
                            <Button
                                size="sm"
                                type="primary"
                                className="my-2 py-0 px-8 bg-white text-metal-800 hover:bg-slate-200"
                                pill={true}
                            >
                                How It Works?
                            </Button>
                        </ScrollLink>
                    </div>
                </div>
                <div className="flex justify-center bg-header_bottom bg-bottom bg-no-repeat" data-aos="fade-up" data-aos-delay="600">
                    <AppCarousel />
                </div>
            </div>
            <div className="bg-slate-100 py-10 px-10 md:px-0" id="key_features">
                <div className="md:w-4/5 lg:w-3/4 xl:w-3/5 mx-auto">
                    <Typography
                        variant="heading-6"
                        className="font-bold mb-10 leading-relaxed text-center"
                    >
                        Key Features
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {key_features.map((feature, index) => (
                            <Card className="p-6 w-full" key={feature.id} data-aos="flip-left" data-aos-delay={300 * index}>
                                <Card.Container className="flex items-start md:gap-5 gap-3.5">
                                    <Card.Container className="flex items-center justify-center rounded-full bg-metal-50 md:p-4 p-2.5">
                                        {feature.icon}
                                    </Card.Container>
                                    <Card.Container className="flex flex-col gap-2">
                                        <Card.Title>{feature.title}</Card.Title>
                                        <Card.Description>
                                            {feature.description}
                                        </Card.Description>
                                    </Card.Container>
                                </Card.Container>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-white py-10 px-10 md:px-0" id="how_it_works">
                <div className="">
                    <Typography
                        variant="heading-6"
                        className="font-bold mb-10 leading-relaxed text-center"
                    >
                        How It Works ?
                    </Typography>
                </div>
                <div>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="px-4 lg:px-16" data-aos="fade-right">
                            <Timeline
                                timelineBarType="dashed"
                                className="w-full lg:w-3/4 mx-auto"
                            >
                                {how_it_works.map((step) => (
                                    <Timeline.Item key={step.id}>
                                        <Timeline.Point icon={step.icon} />
                                        <Timeline.Content>
                                            <Card.Title className="mb-2">
                                                {step.title}
                                            </Card.Title>
                                            <Card.Description>
                                                {step.description}
                                            </Card.Description>
                                        </Timeline.Content>
                                    </Timeline.Item>
                                ))}
                            </Timeline>
                        </div>
                        <div className="flex justify-center">
                            <img
                                src={howWeWorkImage}
                                alt="how we work"
                                className="w-full lg:w-3/4"
                                data-aos="fade-left"
                                data-aos-delay="300"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-slate-100 py-10 px-10 md:px-0">
                <div className="md:w-4/5 lg:w-3/4 xl:w-3/5 mx-auto" data-aos="fade-up">
                    <Typography
                        variant="heading-6"
                        className="font-bold mb-10 leading-relaxed text-center"
                    >
                        Team
                    </Typography>
                    <div className="flex justify-center">
                        <Card className="w-[250px] p-6">
                            <Card.Container className="flex items-center justify-center">
                                <Avatar
                                    shape="circle"
                                    img={anand}
                                    size="2xl"
                                    className="object-cover object-center"
                                />
                            </Card.Container>
                            <Card.Container className="text-center">
                                <Card.Title className="text-body-5 font-semibold text-metal-800 md:text-body-4">
                                    Anand Bhagat
                                </Card.Title>
                                <Card.Title className="!text-body-6 font-normal text-metal-400 md:text-body-5">
                                    Full Stack Developer
                                </Card.Title>
                            </Card.Container>
                            <Card.Container className="circled mx-auto flex max-w-[220px] items-center justify-center divide-x divide-metal-200 rounded-md border border-metal-200 p-1 md:p-2">
                                <Card.Link
                                    className="flex items-center justify-center px-3 py-1"
                                    icon={
                                        <LinkedinLogo
                                            size={24}
                                            color="#0072b1"
                                            weight="fill"
                                        />
                                    }
                                    href="https://www.linkedin.com/in/anandnbhagat/"
                                />
                                <Card.Link
                                    className="flex items-center justify-center px-3 py-1"
                                    icon={
                                        <InstagramLogo
                                            size={24}
                                            color="#d7544d"
                                            weight="fill"
                                        />
                                    }
                                    href="https://www.instagram.com/anbhagat/"
                                />
                            </Card.Container>
                        </Card>
                    </div>
                </div>
            </div>
            <div
                className="bg-white bg-contact_us bg-no-repeat bg-cover py-10 px-10 md:px-0"
            >
                <div className="">
                    <Typography
                        variant="heading-6"
                        className="font-bold mb-10 leading-relaxed text-center"
                    >
                        Contact Us
                    </Typography>
                </div>
                <div className="w-full px-6 md:w-1/2 lg:w-1/3 mx-auto">
                    <ContactUsForm />
                </div>
            </div>
            <div className="bg-slate-100 py-10 px-10 lg:px-64 text-center">
                <Typography
                    variant="body-5"
                    className="font-bold leading-relaxed text-center"
                >
                    © 2024. All rights reserved. Developed by {" "}
                    <a  
                        href="https://anandbhagat.com"
                        className="text-blue-400"
                    >
                        Anand Bhagat
                    </a>
                </Typography>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    getAuthUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
