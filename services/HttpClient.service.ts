/* eslint-disable no-shadow */ import axios, {
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
export const HttpClientService = {
  async post<T>(
    url: string,
    data: unknown,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, any>> {
    return HttpClientService.send<T>({
      ...options,
      url,
      baseURL,
      data,
      method: "post",
    });
  },
  async put<T>(
    url: string,
    data: unknown,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, any>> {
    return HttpClientService.send<T>({
      ...options,
      url,
      baseURL,
      data,
      method: "put",
    });
  },
  async get<T>(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, any>> {
    return HttpClientService.send<T>({
      ...options,
      url,
      baseURL,
      method: "get",
    });
  },
  async delete<T>(
    url: string,
    data: unknown,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, any>> {
    return HttpClientService.send<T>({
      ...options,
      url,
      baseURL,
      data,
      method: "delete",
    });
  },
  async patch<T>(
    url: string,
    data: unknown,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, any>> {
    return HttpClientService.send<T>({
      ...options,
      url,
      baseURL,
      data,
      method: "patch",
    });
  },
  async send<T>(
    httpOptions: AxiosRequestConfig
  ): Promise<AxiosResponse<T, any>> {
    // eslint-disable-next-line no-param-reassign
    httpOptions.headers = { ...httpOptions.headers };
    return axios(httpOptions);
  },
};
