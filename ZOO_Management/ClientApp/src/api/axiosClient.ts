import { AxiosStatic } from "axios";

const DEFAULT_API_VERSION = 3;

export const configureAxiosClient = (axios: AxiosStatic) => {
    axios.interceptors.request.use(config => {
        const apiVersion = config.apiVersion ?? DEFAULT_API_VERSION;
        config.baseURL = config.baseURL ?? `/api/v${apiVersion}/`;
        return config;
    });
    axios.interceptors.request.use(config => {
        config.paramsSerializer = {
            indexes: null,
        };
        return config;
    });
    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            return Promise.reject(error);
        }
    );
};

declare module "axios" {
    export interface AxiosRequestConfig {
        apiVersion?: number;
    }
}
