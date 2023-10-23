import logo from "../../assets/logo.svg";
import Button from "../Button/Button.js";
import "./Navbar.css";
import { fetchGet } from "../../apis/api";
import { useCallback, useEffect, useState } from "react";
import useAsync from "../../hooks/useAsync";
import { Link } from "react-router-dom";

const Logo = ({ link = "/", className, src, alt, height }) => {
  return (
    <Link to={link}>
      <img className={className} src={src} alt={alt} height={height} />
    </Link>
  );
};

const Profile = ({ imgUrl, email, name, id }) => {
  return (
    <div className="profile-box">
      <img className="profile-image" src={imgUrl} alt="profile" />
      <p className="profile-collapse">{email}</p>
    </div>
  );
};

const Navbar = () => {
  const [sampleUser, setSampleUser] = useState({
    id: null,
    name: "",
    email: "",
    profileImageSource: "",
  });
  const [loading, error, getSampleUser] = useAsync(
    fetchGet("/api/sample/user")
  );

  const handleSampleUserProfile = useCallback(async () => {
    const result = await getSampleUser();
    if (!result) return;

    setSampleUser({
      id: result.id,
      name: result.name,
      email: result.email,
      profileImageSource: result.profileImageSource,
    });
  }, [getSampleUser]);

  useEffect(() => {
    handleSampleUserProfile();

    return () =>
      setSampleUser({
        id: null,
        name: "",
        email: "",
        profileImageSource: "",
      });
  }, []);

  return (
    <nav>
      <div className="nav-box">
        <Logo
          link="/"
          className="nav-logo"
          src={logo}
          alt="Linkbrary Logo"
          height={24}
        />
        {!loading ? (
          !sampleUser.id ? (
            <Button className="cta-short" link="/signin.html" text="로그인" />
          ) : (
            <Profile
              imgUrl={sampleUser.profileImageSource}
              email={sampleUser.email}
              id={sampleUser.id}
              name={sampleUser.name}
            />
          )
        ) : null}
        {}
      </div>
    </nav>
  );
};

export default Navbar;
