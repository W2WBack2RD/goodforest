import { request } from "_api/request";
import { handleSuccess, handleError } from "_utils/api";

export const postProblemReport = (report) =>
  request
    .post("/api/reportProblem")
    .send(report)
    .then(handleSuccess)
    .catch(handleError);
