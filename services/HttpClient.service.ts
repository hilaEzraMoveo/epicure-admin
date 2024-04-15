/* eslint-disable no-shadow */ import axios, {
  AxiosError,
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
    const token = sessionStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return HttpClientService.send<T>({
      ...options,
      url,
      baseURL,
      data,
      method: "post",
      headers,
    });
  },
  async put<T>(
    url: string,
    data: unknown,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, any>> {
    const token = sessionStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return HttpClientService.send<T>({
      ...options,
      url,
      baseURL,
      data,
      method: "put",
      headers,
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
    const token = sessionStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return HttpClientService.send<T>({
      ...options,
      url,
      baseURL,
      data,
      method: "delete",
      headers,
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
    const headers = { ...httpOptions.headers };

    try {
      const response = await axios({
        ...httpOptions,
        baseURL,
        headers,
      });

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 401) {
          sessionStorage.removeItem("token");
          window.location.href = "/login";
        }
        throw axiosError;
      } else {
        throw error;
      }
    }
  },
  // async send<T>(
  //   httpOptions: AxiosRequestConfig
  // ): Promise<AxiosResponse<T, any>> {
  //   // eslint-disable-next-line no-param-reassign
  //   httpOptions.headers = { ...httpOptions.headers };
  //   return axios(httpOptions);
  // },
};
