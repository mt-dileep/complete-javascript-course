import { TIMEOUT } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async (url, payload = undefined) => {
  try {
    const fetchPromise = payload
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
      : fetch(url);
    // const res = await Promise.race([fetchPromise, timeout(TIMEOUT)]);
    const res = await fetchPromise;
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
