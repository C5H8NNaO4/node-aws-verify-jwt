Verify AWS serverless cognito jwt tokens.

#Quick Start
    import { getPayload, verifyJWT } from   'node-serverless-verify-jwt';
    
    const payload = await getPayload({
        jwtToken,
        region,
        userPoolID,
    });
    
    const valid = await verifyJWT({
        jwtToken: valid,
        region,
        userPoolID,
        appClientID,
        claims: {
            client_id:      '22vik2co81f7reethfbm8sfat5b',
            exp: (val) => val > ~~(+new Date    ()/1000)
        },
    });
# Setup
`npm install node-serverless-verify-jwt`

## Build 
`npm run build`
 
 Runs `babel src --out-dir lib`

## Test

`npm run test`

Runs jest 