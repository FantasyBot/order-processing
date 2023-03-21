import { APIGatewayProxyEvent } from "aws-lambda";
import { StepFunctions } from "aws-sdk";
// import { EventBodyModel } from "./models";

// {
//   "costumer":{
//      "name":"guram svanidze",
//      "email":"guramisvanidze11@gmail.com",
//      "address":"mindeli street, 9b"
//   },
//   "payment_information":{
//      "card_number":"123456789",
//      "name":"GURAMI SVANIDZE"
//   },
//   "product":{
//      "name":"ram_240_gtx83",
//      "quantity":"1",
//   }
// }

export async function handler(event: APIGatewayProxyEvent) {
  try {
    if (!event.body) {
      throw {
        code: 400,
        message: "BodyNotProvided",
      };
    }
    const rawBody = JSON.parse(event.body);
    if (!rawBody) {
      throw {
        code: 400,
        message: "InputNotProvided",
      };
    }

    // const body = await new EventBodyModel(rawBody)
    //   .serialize()
    //   .catch((error) => Promise.reject({ code: 400, message: error }));

    const sf = new StepFunctions();

    await sf
      .startExecution({
        stateMachineArn: process.env.ORDER_PROCESSING_ARN as string,
        input: JSON.stringify({
          event: rawBody,
        }),
      })
      .promise();

    return {
      statusCode: 200,
    };
  } catch (error) {
    return {
      statusCode: error.code,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
}
