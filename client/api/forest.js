import { request } from "_api/request";

import { handleSuccess, handleError } from "_utils/api";

export const getAllForests = () =>
  request.get("/api/forest/").then(handleSuccess).catch(handleError);

export const getForestById = () =>
  request.get("/api/forest/:id").then(handleSuccess).catch(handleError);
