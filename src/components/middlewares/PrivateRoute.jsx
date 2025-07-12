import Loader from "../Loader/Loader";
import { getAuthUserProfile } from "../../redux/actions/authAction";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import generateUrl from "../../utils/routes";

const PrivateRoute = ({ auth, getAuthUserProfile, element, ...rest }) => {
    useEffect(() => {
        getAuthUserProfile();
    }, []);

    const isLoggedIn = auth.isLoggedIn;
    if (isLoggedIn === true) {
        return <Outlet />;
    } else if (isLoggedIn === false) {
        return <Navigate to={generateUrl("login")} />;
    }

    return <Loader loading={true} />;
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = {
    getAuthUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
