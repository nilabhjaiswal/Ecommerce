import React, { Fragment, useEffect, useState } from "react";
import "./ResetPassword.css";
import { default as LockOpenIcon } from "@mui/icons-material/LockOpen";
import { default as LockIcon } from "@mui/icons-material/Lock";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import {  useMatch } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearErrors, resetPassword } from "../../actions/profileAction.js";
import Loader from "../layout/Loader/Loader.js";
import MetaData from "../layout/MetaData";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  // const match = useMatch("/password/reset/:token");
  const { token } = useParams();

  const forgotPassword = useSelector((state) => state.profile);
  const { error, loading, success } = forgotPassword;

  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("newPassword", Password);
    myForm.set("confirmPassword", confirmPassword);
    // dispatch(resetPassword(match.params.token,myForm));
    dispatch(resetPassword(token,myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password Change Successfully");
      navigate("/login");
    }
  }, [dispatch, error, alert, navigate, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Reset Password Page" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
