import { requestControllerApi } from "../request";
import { IVariable } from "./types";
import { IUser } from "../user";

export function requestListVariablesOfUser(userId: IUser["id"]) {
  return requestControllerApi<IVariable[]>("get", "variable", {
    params: { user: userId },
  });
}

export function requestUpdateVariable(variable: IVariable) {
  return requestControllerApi<IVariable>("put", "variable", {
    pk: variable.id,
    data: variable,
  });
}

export function requestDeleteVariable(variable: IVariable) {
  return requestControllerApi<null>("delete", "variable", {
    pk: variable.id,
  });
}

export function requestBulkUpdateVariableOfUser(
  variables: IVariable[],
  userId: IUser["id"]
) {
  return requestControllerApi<IVariable[]>("put", "variable", {
    params: { user: userId },
    action: "bulk-update",
    data: variables,
  });
}

export function requestApplyVariablesOfUser(userId: IUser["id"]) {
  return requestControllerApi<IVariable[]>("post", "variable", {
    params: { user: userId },
    action: "apply",
  });
}
