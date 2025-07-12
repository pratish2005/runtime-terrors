import { Button, Typography } from "keep-react";
import React, { useEffect, useState } from "react";
import TextInputComponent from "../../components/FormElements/TextInputComponent";
import { Link, useNavigate } from "react-router-dom";
import generateUrl from "../../utils/routes";
import { Lock } from "phosphor-react";
import { registerUser } from "../../redux/actions/authAction";
import Loader from "../../components/Loader/Loader";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Logo from "../../components/Logo/Logo";

const Register = ({ auth, registerUser }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(formData, (response) => {
            Swal.fire("Success", response.message, "success").then(() => {
                navigate(generateUrl("login"));
            });
        });
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="w-full px-6 md:w-1/2 lg:w-1/3 xl:w-1/4">
                <div className="flex flex-col items-center gap-4">
                    <Logo />
                    <Typography variant="paragraph-3" className="text-center">
                        Please enter your details to create an account.
                    </Typography>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-8">
                        <div className="mb-4">
                            <TextInputComponent
                                id="name"
                                name="name"
                                placeholder="Name"
                                label="Name *"
                                handleOnChange={handleOnChange}
                                value={formData.name}
                                error={auth?.errors?.name?.message}
                            />
                        </div>
                        <div className="mb-4">
                            <TextInputComponent
                                id="email"
                                name="email"
                                placeholder="Email"
                                label="Email *"
                                handleOnChange={handleOnChange}
                                value={formData.email}
                                error={auth?.errors?.email?.message}
                            />
                        </div>
                        <div className="mb-4">
                            <TextInputComponent
                                id="password"
                                name="password"
                                placeholder="Password"
                                label="Password *"
                                handleOnChange={handleOnChange}
                                value={formData.password}
                                type="password"
                                addon={<Lock size={20} />}
                                addonPosition="left"
                                addonStyle="text-slate-500"
                                error={auth?.errors?.password?.message}
                            />
                        </div>
                        <div className="mb-4">
                            <TextInputComponent
                                id="confirm_password"
                                name="confirm_password"
                                placeholder="Confirm Password"
                                label="Confirm Password *"
                                handleOnChange={handleOnChange}
                                value={formData.confirm_password}
                                type="password"
                                addon={<Lock size={20} />}
                                addonPosition="left"
                                addonStyle="text-slate-500"
                                error={auth?.errors?.confirm_password?.message}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="hidden" />
                        <Button
                            size="md"
                            type="primary"
                            className="w-full"
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <Typography
                            variant="paragraph-3"
                            className="text-center"
                        >
                            Already have an account?{" "}
                            <Link
                                to={generateUrl("login")}
                                className="text-primary-500 font-medium"
                            >
                                Log In
                            </Link>
                        </Typography>
                    </div>
                </form>
            </div>
            <Loader loading={auth.loading} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = {
    registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
