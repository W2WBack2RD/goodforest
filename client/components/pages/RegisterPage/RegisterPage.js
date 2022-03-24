import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";

import Register from "_templates/RegisterSection";

export default function RegisterPage() {
  RegisterPage.treeImg = true;

  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));

  useEffect(() => {
    if (!R.isEmpty(user)) {
      dispatch(push("/register"));
    }
  }, []);

  return (
    <div className="register-page page">
      <Register />
    </div>
  );
}
