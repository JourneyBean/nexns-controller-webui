import axios, { AxiosRequestConfig } from "axios";
import { IRequestConfig } from "./types";

export function getControllerUrl(
  name: string,
  pk?: string | number,
  action?: string
) {
  let url = `http://localhost:8000/api/v1/${name}/`;
  if (pk != null) {
    url = url + String(pk) + "/";
  }
  if (action != null) {
    url = url + action + "/";
  }
  return url;
}

export function requestControllerApi<T>(
  method: AxiosRequestConfig["method"],
  name: string,
  config?: IRequestConfig
) {
  if (method && method in ["patch", "put", "delete"] && config?.pk == null) {
    throw "When using patch, put or delete, pk must be provided.";
  }

  return axios.request<T>({
    method: method,
    url: getControllerUrl(name, config?.pk, config?.action),
    params: config?.params,
    data: config?.data,
  });
}
