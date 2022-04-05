import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";
import FaultReporting from "../../organisms/FaultReporting/FaultReporting";

export default function FaultReportingPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));

  useEffect(() => {
    if (!R.isEmpty(user)) {
      dispatch(push("/home"));
    }
  }, []);

  return (
    <div className="register-page page">
      <FaultReporting />
    </div>
  );
}
