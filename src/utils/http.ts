import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  timeout: 10000,
});

export type AxiosRes<T = ResData> = {
  config: Object;
  data: T;
  headers: any;
  request: any;
  status: number;
  statusText: string;
};

export type ResData<T = any> = {
  code: number;
  message: string;
  data: T;
};

instance.interceptors.response.use((resp: AxiosResponse) => {
  return resp;
}, (error) => {
  message.error(error.message || '系统开小差了，请稍后再试');
  
  return Promise.reject(error);
});

export default instance;
