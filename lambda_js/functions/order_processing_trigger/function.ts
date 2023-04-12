import { APIGatewayProxyEvent } from "aws-lambda";
import StepFunctions from "aws-sdk/clients/stepfunctions";
import { EventBodyModel } from "./models";

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

    const body = await new EventBodyModel(rawBody)
      .serialize()
      .catch((error) => Promise.reject({ code: 400, message: error }));

    const sf = new StepFunctions();

    await sf
      .startExecution({
        stateMachineArn: process.env.ORDER_PROCESSING_ARN as string,
        input: JSON.stringify({
          event: body,
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
