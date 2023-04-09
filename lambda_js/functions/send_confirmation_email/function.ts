import AWS from "aws-sdk";

export async function handler(input: any) {
  const ses = new AWS.SES();

  const params = {
    Destination: {
      ToAddresses: [input.costumer.email],
    },
    Message: {
      Body: {
        Text: {
          Data: `Your product (${input?.product?.product_name}, qty: ${input?.product?.quantity}) has been shipped`,
        },
      },
      Subject: {
        Data: "Order Confirmation",
      },
    },
    Source: process.env.FROM_EMAIL as string,
  };
  await ses.sendEmail(params).promise();

  return input;
}

// `AWS SES` in free tier has only 200 email in a day for free (6200 in month).
//  without encreasing limits had to verify every email - `sender` and `receiver`
//  If you encrease the limit (not free tier as I know) you would be able to send 50000 email each month
//  and you have to verify ONLY `sender` email.

//  TO VERIFY EMAIL WITH CLI:
//  aws ses verify-email-identity --email-address your-email-address --region eu-central-1

// LIST VERIFIED ADRESSES:
// aws ses list-identities --region eu-central-1