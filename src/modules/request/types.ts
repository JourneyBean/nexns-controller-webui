import { AxiosRequestConfig } from "axios";

export interface IRequestConfig {
  pk?: string | number;
  params?: AxiosRequestConfig["params"];
  data?: AxiosRequestConfig["data"];
  action?: string;
}
