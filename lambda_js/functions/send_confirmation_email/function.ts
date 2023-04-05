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
          Data: `<div>
                   <h2>Your order (${input.product.name}) has been shipped!</h2>
                   <h2>Product Information:</h2>
                   <p>product name : ${input.shipping_information.product_name}</p>
                   <p>quantity : ${input.product.quantity}</p>
                   <p>product price : ${input.shipping_information.product_price}</p>
                   <p>address : ${input.costumer.address}</p>
                 </div>`,
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
//  and you have to verify only `sender` email.
