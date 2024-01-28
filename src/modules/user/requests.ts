import { requestControllerApi } from "../request";
import { ICsrfTokenResponse, IUser } from "./types";

export function requestGetCurrentUser() {
  return requestControllerApi<IUser>("get", "current-user");
}

export function requestGetCsrfToken() {
  return requestControllerApi<ICsrfTokenResponse>("get", "csrf-token");
}
