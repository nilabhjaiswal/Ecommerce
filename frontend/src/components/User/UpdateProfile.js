import React, { Fragment, useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import { default as MailOutlineIcon } from "@mui/icons-material/MailOutline";
import { default as FaceIcon } from "@mui/icons-material/Face";
// export 'MailOutlineIcon' (imported as 'MailOutlineIcon') was not found in '@mui/icons-material/MailOutline' (possible exports: __esModule, default)
// above error ko hatane k liye use default as import { default as MailOutlineIcon} from "@mui/icons-material/MailOutline";
// inside curly braket error solve ho jayega
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader.js";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  updateProfile,
  loadUser,
} from "../../actions/profileAction.js";
import { UPDATE_PROFILE_RESET } from "../../constants/profileContants.js";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const UpdateProfile = useSelector((state) => state.profile || {});
  const { error, loading, isUpdated } = UpdateProfile; 
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [user, dispatch, error, alert, navigate, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
        <MetaData title="Update Profile Page"/>
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
            <h2 className="updateProfileHeading">Update Profile</h2>
            <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input type="submit" value="Update" className="updateProfileBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
