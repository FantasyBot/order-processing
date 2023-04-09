import AWS from "aws-sdk";
const docClient = new AWS.DynamoDB.DocumentClient();

export async function handler(input: any) {
  const params = {
    TableName: process.env.PRODUCTS_DB,
    KeyConditionExpression: "product_name = :product_name",
    FilterExpression: "count_in_stock >= :quantity",
    ExpressionAttributeValues: {
      ":product_name": input?.product?.product_name,
      ":quantity": Number(input?.product?.quantity),
    },
  };

  const { Items } = await docClient.query(params).promise();

  if (!Items.length) {
    throw new Error("ProductNotProvidedExeption");
  }

  return { ...input, shipping_information: Items[0] };
}
