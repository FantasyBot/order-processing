import AWS from "aws-sdk";
const docClient = new AWS.DynamoDB.DocumentClient();

export async function handler(input: any) {
  // 1. Create shipping label ( new record depending on prdocut information )
  const shippingParams = {
    TableName: process.env.SHIPPING_DB,
    Item: {
      email: input.costumer.email,
      product_id: input.shipping_information.product_id,
      user_name: input.costumer.user_name,
      address: input.costumer.address,
      product_name: input.shipping_information.product_name,
      product_quantity: Number(input.product.quantity),
      product_price: Number(input.shipping_information.product_price),
      shipped: true,
    },
  };
  await docClient.put(shippingParams).promise();

  // 2. deacrese count_in_stock value after creating shipping label
  const productParams = {
    TableName: process.env.PRODUCTS_DB,
    Key: {
      product_id: input.shipping_information.product_id,
      product_name: input.shipping_information.product_name,
    },
    UpdateExpression: "SET #attrName = :attrValue",
    ExpressionAttributeNames: {
      "#attrName": "count_in_stock",
    },
    ExpressionAttributeValues: {
      ":attrValue":
        input.shipping_information.count_in_stock - input.product.quantity,
    },
  };
  await docClient.update(productParams).promise();

  return input;
}
