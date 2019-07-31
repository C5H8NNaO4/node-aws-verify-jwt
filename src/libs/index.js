import jose from 'node-jose';
import fetch from 'isomorphic-fetch';

const keysURL = ({ region, userPoolID }) => `https://cognito-idp.${region}.amazonaws.com/${userPoolID}/.well-known/jwks.json`;
const equals = claim => value => claim === value;

export const getPayload = async ({
  jwtToken, region, userPoolID,
}) => {
  const url = keysURL({ region, userPoolID });
  const [headerB64] = jwtToken.split('.');

  let parsedHeader;
  try {
    const decodedHeader = jose.util.base64url.decode(headerB64);
    parsedHeader = JSON.parse(decodedHeader);
  } catch (e) {
    throw new Error('Invalid header data in token.');
  }

  const { kid } = parsedHeader;
  if (!kid) {
    throw new Error('Missing kid in header data.');
  }

  let keysJSON;
  try {
    const keysResult = await fetch(url);
    keysJSON = await keysResult.json();
  } catch (e) {
    throw new Error(`Failed loading public key data for user pool id ${userPoolID} in region ${region}`);
  }

  const { keys } = keysJSON;
  const publicKeyData = keys.find(key => key.kid === kid);

  if (!publicKeyData) {
    throw new Error('Invalid publickey.');
  }

  let payload;
  try {
    const key = await jose.JWK.asKey(publicKeyData);
    const verified = await jose.JWS.createVerify(key).verify(jwtToken);
    payload = JSON.parse(verified.payload);
  } catch (e) {
    throw new Error('Invalid signature.');
  }


  return payload;
};

export const verifyJWT = async ({
  jwtToken, region, userPoolID, claims,
}) => {
  const payload = await getPayload({ jwtToken, region, userPoolID });

  const currentSeconds = ~~(Date.now() / 1000);

  if (currentSeconds > payload.exp) {
    throw new Error('Token expired.');
  }

  for (const claim in claims) {
    if (Object.hasOwnProperty.call(claims, claim)) {
      const value = claims[claim];
      const testValue = typeof value === 'function' ? claims[claim] : equals (claims[claim]);

      if (!testValue(payload[claim])) {
        throw new Error(`Failed asserting claim ${claim} === ${testValue}.`);
      }
    }
  }

  return true;
};
