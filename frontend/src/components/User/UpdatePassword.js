import React, { Fragment, useEffect,  useState } from "react";
import "./UpdatePassword.css";
import { default as LockOpenIcon } from "@mui/icons-material/LockOpen";
import { default as LockIcon } from "@mui/icons-material/Lock";
import { default as VpnKeyIcon } from "@mui/icons-material/VpnKey";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  clearErrors,
  updatePassword,
} from "../../actions/profileAction.js";
import { UPDATE_PASSWORD_RESET } from "../../constants/profileContants.js";
import Loader from "../layout/Loader/Loader.js";
import MetaData from "../layout/MetaData";
const UpdatePassword = () => {
    const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  
  const UpdatePassword = useSelector((state) => state.profile) || {};
  const { error, loading, isUpdated } = UpdatePassword;

  const[oldPassword, setOldPassword] = useState("");
  const[newPassword, setNewPassword] = useState("");
  const[confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password Change Successfully");
      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [ dispatch, error, alert, navigate, isUpdated ]);

  return (<Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
      <MetaData title="Change Password Page"/>
        <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
          <h2 className="updatePasswordHeading">Update Password</h2>
          <form
              className="updatePasswordForm"
              encType="multipart/form-data"
              onSubmit={updatePasswordSubmit}
            >
             <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              <input type="submit" value="ChangePassword" className="updatePasswordBtn" />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>);
};

export default UpdatePassword;
