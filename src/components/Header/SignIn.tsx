import React from "react";
import { RoutesEnum } from "../../routes";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { signOutUser } from "../../lib/firebase/Authentication/SignOut";

const SignIn: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user === null) {
    return (
      <Link to={RoutesEnum.Login} className="text-sm font-semibold leading-6">
        Log in <span aria-hidden="true">&rarr;</span>
      </Link>
    );
  }
  return (
    <div className="flex gap-4 flex-col lg:flex-row">
      <Link to={RoutesEnum.Account} className="text-sm font-semibold leading-6">
        My Account <span aria-hidden="true">&rarr;</span>
      </Link>
      <p
        onClick={() => signOutUser(navigate)}
        className="text-sm font-semibold leading-6 cursor-pointer text-red-600"
      >
        Sign Out
      </p>
    </div>
  );
};

export default SignIn;
