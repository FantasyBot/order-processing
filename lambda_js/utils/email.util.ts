// import { google } from "googleapis";
// import { Transporter, createTransport } from "nodemailer";
// import Mail from "nodemailer/lib/mailer";

// export async function sendEmail(transport: Transporter, mail: Mail.Options) {
//   const data = await new Promise((resolve, reject) => {
//     transport.sendMail(mail, (error, info) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(info);
//       }
//     });
//   });
//   return data;
// }

// export async function createEmailTransport(
//   from: string,
//   clientId: string,
//   clientSecret: string,
//   refreshToken: string
// ) {
//   const OAuth2Client = new google.auth.OAuth2(clientId, clientSecret);
//   OAuth2Client.setCredentials({ refresh_token: refreshToken });
//   const accesToken = await OAuth2Client.getAccessToken();

//   return createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: from,
//       clientId,
//       clientSecret,
//       refreshToken,
//       accesToken,
//     },
//   } as Parameters<typeof createTransport>[0]);
// }
