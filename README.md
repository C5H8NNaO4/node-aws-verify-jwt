Verify AWS serverless cognito jwt tokens.

## Setup
`npm install node-aws-verify-jwt`

## Quick Start

    import { getPayload, verifyJWT } from   'node-aws-verify-jwt';
    
    //Verify integrity of the token and return the payload.
    const payload = await getPayload({
        jwtToken,
        region,
        userPoolID,
    });
    
    //Verify the token and validate claims.
    const valid = await verifyJWT({
        jwtToken: valid,
        region,
        userPoolID,
        claims: {
            client_id: '22vik2co81f7reethfbm8sfat5b',
            exp: (val) => val > ~~(+new Date/1000)
        },
    });

## Build 
`npm run build`
 
 Runs `babel src --out-dir lib`

## Test

`npm run test`

Runs jest 