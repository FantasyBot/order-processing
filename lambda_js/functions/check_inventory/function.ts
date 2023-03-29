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

  // const params = {
  //   TableName: "order-processing-dev-products_db",
  //   Item: {
  //     product_name: "ram_240_gtx83-5",
  //     product_id: "ad7d61ee-cbb5-11ed-afa1-0242ac120002",
  //     count_in_stock: 43,
  //     product_price: 100,
  //   },
  // };

  // const data = await docClient.put(params).promise();
  const { Items } = await docClient.query(params).promise();

  if (!Items.length) {
    throw new Error("ProductNotProvidedExeption");
  }

  return { ...input, shipping_information: Items[0] };
}
