import AWS from "aws-sdk";
const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  region: "eu-central-1",
});

export async function handler(input: any) {
  const params = {
    TableName: "order-processing-dev-products_db",
    IndexName: "product_name-index",
    KeyConditionExpression: "product_name = :name",
    FilterExpression: "count_in_stock <= :quantity",
    ExpressionAttributeValues: {
      ":name": "ram_240_gtx83-5",
      ":quantity": 2,
    },
  };

  const data = await docClient.query(params).promise();
  // if (!data?.Item) {
  //   throw new Error("ProductNotProvidedExeption");
  // }
  console.log("data - -  -> ", data);

  return input;
}
