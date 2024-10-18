interface MessageApi {
  open(config: {type: 'success' | 'error' | 'warning'; content: string }): void;
}

let messageApi: MessageApi | null = null; 

export const initMessageApi = (api: MessageApi) => {
  messageApi = api; 
};

const success = (message: string) => {
  if (messageApi) {
    messageApi.open({
      type: 'success',
      content: message,
    });
  } else {
    console.error('messageApi is not initialized');
  }
};

const error = (message: string) => {
  if (messageApi) {
    messageApi.open({
      type: 'error',
      content: message,
    });
  } else {
    console.error('messageApi is not initialized');
  }
};

const warning = (message: string) => {
  if (messageApi) {
    messageApi.open({
      type: 'warning',
      content: message,
    });
  } else {
    console.error('messageApi is not initialized');
  }
};

export { success, error, warning };
