import AWS from "aws-sdk/clients/ses";
import { extractErrorData } from "./utils";

const ses = new AWS();

// This lambda is used to handle errors from SQS
export async function handler(input) {
  const { email, error } = extractErrorData(input);

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Data: error,
        },
      },
      Subject: {
        Data: error,
      },
    },
    Source: process.env.FROM_EMAIL as string,
  };
  await ses.sendEmail(params).promise();
}
