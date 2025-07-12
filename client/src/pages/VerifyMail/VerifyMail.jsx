import { Alert, Button, Typography } from "keep-react";
import React, { useEffect, useState } from "react";
import { XCircle } from "phosphor-react";
import TextInputComponent from "../../components/FormElements/TextInputComponent";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import generateUrl from "../../utils/routes";
import { verifyEmail } from "../../redux/actions/authAction";
import { connect } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Swal from "sweetalert2";
import Logo from "../../components/Logo/Logo";

const VerifyMail = ({ auth, verifyEmail }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = (token) => {
        verifyEmail(
            {
                token,
            },
            (response) => {
                Swal.fire("Success", response.message, "success").then(() => {
                    navigate(generateUrl("login"));
                });
            }
        );
    };

    useEffect(() => {
        handleSubmit(token);
    }, [token]);

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="w-full px-6 md:w-1/2 lg:w-1/3 xl:w-1/4">
                <div className="flex flex-col items-center gap-4">
                    <Logo />
                    <Typography variant="paragraph-3" className="text-center">
                        Please verify you Email.
                    </Typography>
                </div>
                {auth?.errors?.error && (
                    <Alert
                        rounded={true}
                        withBorder={true}
                        withBorderAccent={true}
                        color="error"
                    >
                        <Alert.Container>
                            <Alert.Icon>
                                <XCircle size={24} color="#E92215" />
                            </Alert.Icon>
                            <Alert.Body>
                                <Alert.Description>
                                    {auth?.errors?.error}
                                </Alert.Description>
                            </Alert.Body>
                        </Alert.Container>
                    </Alert>
                )}
            </div>
            <Loader loading={auth.loading} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = {
    verifyEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyMail);
