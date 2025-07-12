import { Button, Typography } from "keep-react";
import React, { useState } from "react";
import { Lock } from "phosphor-react";
import TextInputComponent from "../../components/FormElements/TextInputComponent";
import { Link, useNavigate } from "react-router-dom";
import generateUrl from "../../utils/routes";
import {
    loginUser,
    resendVerificationLink,
} from "../../redux/actions/authAction";
import { connect } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Swal from "sweetalert2";
import Logo from "../../components/Logo/Logo";

const Login = ({ auth, loginUser, resendVerificationLink }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showResendVerificationButton, setShowResendVerificationButton] =
        useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(
            formData,
            (response) => {
                Swal.fire("Success", response.message, "success").then(() => {
                    navigate(generateUrl("dashboard"));
                });
            },
            (response) => {
                if (response?.errors?.is_verified === false) {
                    setShowResendVerificationButton(true);
                }
            }
        );
    };

    const handleResendVerification = (e) => {
        e.preventDefault();
        resendVerificationLink({ email: formData.email }, (response) => {
            Swal.fire("Success", response.message, "success");
        });
    };
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="w-full px-6 md:w-1/2 lg:w-1/3 xl:w-1/4">
                <div className="flex flex-col items-center gap-4">
                    <Logo />
                    <Typography variant="paragraph-3" className="text-center">
                        Please enter your details to log in
                    </Typography>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-8">
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
                        {showResendVerificationButton && (
                            <div className="pt-3">
                                <Button
                                    size="xs"
                                    type="linkPrimary"
                                    className="w-full"
                                    onClick={handleResendVerification}
                                >
                                    Resend Verification Link
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="hidden" />
                        <Button
                            size="md"
                            type="primary"
                            className="w-full"
                            onClick={handleSubmit}
                        >
                            Log in
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <Typography
                            variant="paragraph-3"
                            className="text-center"
                        >
                            Don't have an account?{" "}
                            <Link
                                to={generateUrl("register")}
                                className="text-primary-500 font-medium"
                            >
                                Create account
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
    loginUser,
    resendVerificationLink,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
