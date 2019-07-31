import 'babel-polyfill';
import { getPayload, verifyJWT } from '.';

const jwtToken = 'eyJraWQiOiJLVHpTdzZBektPRnZTXC96RExxK2E1ZVVIMEZGV1wvRVpOdUxrcUYyRjcyZlE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJmNTdhNjNjMS1iNTQ2LTQ3MDktOTM1Mi0yODU2YmFlNDdkNDIiLCJldmVudF9pZCI6IjdhNzYwZGVkLTJkMGEtNDgxNS1iOWQyLTBjN2IzNjRlZWY1YiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NjQzOTk2NzgsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yXzhHMFFEcVFpMyIsImV4cCI6MTU2NDUzMDE5OCwiaWF0IjoxNTY0NTI2NTk4LCJqdGkiOiI4ZGNmODJlNi04MzZkLTQ2ODQtOWEzZC02YmM5ZDNhMGUyYjgiLCJjbGllbnRfaWQiOiIyMnZpazJjbzgxZjdyZWV0aGZibThzZmF0NSIsInVzZXJuYW1lIjoiZjU3YTYzYzEtYjU0Ni00NzA5LTkzNTItMjg1NmJhZTQ3ZDQyIn0.LxkzxALn1N4EehqEg4E65yOUoImOvhxQI70bXim4sL8iJuztTsaRJt2PGt2pZqNjRsJQYZUjdErafJOjO_9rWHmYM14PJn63YKHf_BIDWOLF8pbGyqqNZjSKOJQzQUr48UGWwFFJkp9c6lbCuQpwuv4WXseO28rq_lRO-AvbASbNlR752G49ZmxBA5dKGWXAIv7FQ8zrMXVNV0ebpeTLg58ce35uQx2O5CmTJrTtZmJaKrQl-ooakDyrZmrSRiyHn43k3x-ZkJpdeEB9UeYUt3ilSj7zTQCkzcTlByZRq5txD42UMzI3ddbFAkgeIppo5xFYKyA6hG5u-E4TetET2g';
const userPoolID = 'us-east-2_8G0QDqQi3';
const appClientID = '22vik2co81f7reethfbm8sfat5';
const region = 'us-east-2';

it('verifies and decodes the payload', async () => {
  const { exp } = await getPayload({
    jwtToken,
    region,
    userPoolID,
  });
  expect(exp).toBe(1564530198);
});

it('verifies an expired token and throws', async () => {
  let err = "";
  try {
    await verifyJWT({
      jwtToken,
      region,
      userPoolID,
    });
  } catch (e) {
    const { message } = e;
    err = message;
} finally {
    expect(err).toBe('Token expired.');
  }
});
