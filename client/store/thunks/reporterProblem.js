import { push } from "connected-react-router";
import { store as RNC } from "react-notifications-component";

import { postTreeReport } from "_api/report";

import { dispatchError } from "_utils/api";
export const attemptSendReport = (newUser) => (dispatch) =>
  postTreeReport(newUser)
    .then((data) => {
      RNC.addNotification({
        title: "הסטטוס התקבל בהצלחה!",
        message: "תודה על השתתפותך",
        type: "success",
        container: "top-right",
        animationIn: ["animated", "fadeInRight"],
        animationOut: ["animated", "fadeOutRight"],
        dismiss: {
          duration: 5000,
        },
      });

      return dispatch(push("/updating-fault-reporting"));
    })
    .catch(dispatchError(dispatch));
