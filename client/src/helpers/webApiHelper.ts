import queryString from 'query-string';

type FetchArgs = {
  endpoint: string;
  type: 'GET' | 'POST' | 'PUT' | 'DELETE';
  request?: { [k: string]: any };
  query?: { [k: string]: number | boolean | string | null };
  attachment?: string;
  skipAuthorization?: boolean;
  ct?: any;
};

function getFetchUrl(args: FetchArgs) {
  return args.endpoint + (args.query ? `?${queryString.stringify(args.query)}` : '');
}

function getFetchArgs(
  args: FetchArgs,
): Pick<RequestInit, 'method' | 'headers' | 'signal' | 'body'> {
  const headers: { [header: string]: string } = {};
  if (!args.attachment) {
    headers['Content-Type'] = 'application/json';
    headers.Accept = 'application/json';
  }
  const token = localStorage.getItem('token');
  if (token && !args.skipAuthorization) {
    headers.Authorization = `Bearer ${token}`;
  }
  let body;
  if (args.attachment) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support attachments.');
    }
    const formData = new FormData();
    formData.append('image', args.attachment);
    body = formData;
  } else if (args.request) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support request body.');
    }
    body = JSON.stringify(args.request);
  }
  return {
    method: args.type,
    headers,
    signal: args.ct,
    ...(args.type === 'GET' ? {} : { body }),
  };
}

export async function throwIfResponseFailed(res: Response) {
  if (!res.ok) {
    let parsedException = 'Something went wrong with request!';
    try {
      parsedException = await res.json();
    } catch (err) {
      //
    }
    throw parsedException;
  }
}

export default async function callWebApi(args: FetchArgs) {
  try {
    const res = await fetch(getFetchUrl(args), getFetchArgs(args));
    await throwIfResponseFailed(res);
    return res;
  } catch (err) {
    throw err;
  }
}
