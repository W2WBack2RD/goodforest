import { push } from "connected-react-router";
import { store as RNC } from "react-notifications-component";

import { postProblemReport } from "_api/reporterProblem";

import { dispatchError } from "_utils/api";
export const attemptSendReport = (newUser) => (dispatch) =>
  postProblemReport(newUser)
    .then((data) => {
      RNC.addNotification({
        title: "התקלה דווחה בהצלחה!",
        message: "תודה על השתתפותך",
        type: "success",
        container: "top-right",
        animationIn: ["animated", "fadeInRight"],
        animationOut: ["animated", "fadeOutRight"],
        dismiss: {
          duration: 5000,
        },
      });

      return dispatch(push("/updatingFaultReporting"));
    })
    .catch(dispatchError(dispatch));
