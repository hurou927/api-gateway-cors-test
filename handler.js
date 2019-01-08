'use strict';

const defaultALlowOrigin = process.env.DEFAULT_ALLOW_ORIGIN;
const allowOriginList = process.env.ALLOW_ORIGINS.split(',');

const generateAllowOriginParameter = async (callerOrigin) => {
  if(callerOrigin===undefined) {
    return defaultALlowOrigin
  }
  return allowOriginList
    .filter(origin => callerOrigin.match(origin))
    .length > 0 ? callerOrigin : defaultALlowOrigin;
}

module.exports.hello = async (event, context) => {
  console.log(event);
  const allowOrigin = await generateAllowOriginParameter(event.headers.origin);
  console.log({ allowOrigin });
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Credentials': true,
      'set-cookie': 'corsCookieTest0=HelloCors0',
      'Set-cookie': 'corsCookieTest1=HelloCors1;domain=.hurouap.com',
      'sEt-cookie': 'corsCookieTest2=HelloCors2;',
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      allowOrigin,
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

