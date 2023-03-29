export async function handler(input: any) {
  const { payment_information } = input;

  console.log("Payment info - - - > ", payment_information);
  // TODO Add payment transaction according to card info
  return input;
}
