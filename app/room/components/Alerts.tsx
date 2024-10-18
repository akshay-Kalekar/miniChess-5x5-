import { message } from 'antd';

let messageApi: any;

export const initMessageApi = (setMessageApi: (api: any) => void) => {
  messageApi = setMessageApi;
};

const success = (message) => {
  messageApi.open({
    style:'',
    type: 'success',
    content: message,
  });
};

const error = (message) => {
  messageApi.open({
    type: 'error',
    content: message,
  });
};

const warning = (message) => {
  messageApi.open({
    type: 'warning',
    content: message,
  });
};

export { success, error, warning };