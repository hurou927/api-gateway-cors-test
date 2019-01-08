'use strict';

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': event.headers.origin,
      'Access-Control-Allow-Credentials': true,
      'set-cookie': 'corsCookieTest0=HelloCors0',
      'Set-cookie': 'corsCookieTest1=HelloCors1;domain=.hurouap.com',
      'sEt-cookie': 'corsCookieTest2=HelloCors2;',
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

