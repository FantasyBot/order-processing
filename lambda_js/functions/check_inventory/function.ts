import AWS from "aws-sdk";
const docClient = new AWS.DynamoDB.DocumentClient();

export async function handler(input: any) {
  const params = {
    TableName: process.env.PRODUCTS_DB,
    KeyConditionExpression: "product_name = :name",
    FilterExpression: "count_in_stock >= :quantity",
    ExpressionAttributeValues: {
      ":name": input?.product?.name,
      ":quantity": input?.product?.quantity,
    },
  };

  const { Items } = await docClient.query(params).promise();

  if (!Items.length) {
    throw new Error("ProductNotProvidedExeption");
  }

  return { ...input, shipping_information: Items[0] };
}
