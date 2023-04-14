// This lambda is used to handle errors from SQS
export async function handler(input: any) {
  const errorMessage = JSON.parse(
    JSON.parse(input?.Records[0]?.body)?.Cause
  )?.errorMessage;

  console.log("errorMessage", errorMessage);
}
