import { createEmailTransport, sendEmail } from "../../utils/email.util";

export async function handler(input: any) {
  console.log("event in send_email  ---> ", input);

  // console.log("from email  - - - -  > ", process.env.G_APP_FROM_EMAIL);

  // const transport = await createEmailTransport(
  //   process.env.G_APP_FROM_EMAIL as string,
  //   process.env.G_APP_CLIENT_ID as string,
  //   process.env.G_APP_CLIENT_SECRET as string,
  //   process.env.G_APP_REFRESH_TOKEN as string
  // );

  // const data = await sendEmail(transport, {
  //   to: input.to,
  //   subject: input.subject,
  //   html: input.content,
  //   cc: input.cc,
  //   bcc: input.bcc,
  //   attachments: input.attachments,
  // });

  // transport.close();

  // console.log("email data -  - - >", data);

  return input;
}

// I could use `AWS SES` but in free tier it has only 200 email in a day for free (6200 in month).
// The main reason to swith google email service was that `AWS SES` without encreasing limits had to verify every email - `sender` and `receiver`
// If you encrease the limit (not free tier as I know) you would be able to send 50000 email each month and you have to verify only `sender` email.
