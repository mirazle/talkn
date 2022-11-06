import conf from 'common/conf';

const method = 'POST';
const mode = 'cors';

type ResponseResultType = {
  response: any;
  error: string;
};

export const json = async (action, _body = {}) => {
  const body = JSON.stringify(_body);
  if (JSON.parse(body)) {
    const response = await fetch(`https://${conf.coverURL}/api/${action}`, {
      method,
      mode,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      cache: 'no-cache',
      body,
    });

    const responseResdultJson: ResponseResultType = await response.json();
    if (responseResdultJson.error && responseResdultJson.error !== '') {
      console.warn(responseResdultJson.error);
    }
    return responseResdultJson.response;
  }
};

export const formData = async (action, email, body) => {
  const response = await fetch(`https://${conf.coverURL}/api/${action}`, {
    method,
    mode,
    cache: 'no-cache',
    body,
  });
  if (response.status !== 200) {
    console.warn(response);
  }
};

export default {
  json,
  formData,
};
