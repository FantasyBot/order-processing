import { DynamoDB } from "aws-sdk";
const docClient = new DynamoDB.DocumentClient();

export async function handler(input: any) {
  console.log("input - - - >", input);

  const params = {
    TableName: "order-processing-dev-products_db",
  };

  try {
    // const data = await docClient.query(params).promise();
    const data = await docClient.scan(params).promise();

    console.log(" data -  -- - - - - > ", data);

    if (data.Item) {
      console.log("Product with name x exists in the table  -- - ", data);
      // your processing logic here
    } else {
      console.log("Product with name x does not exist in the table");
      // your processing logic here
    }
  } catch (err) {
    console.log("Error: ", err);
    // your error handling logic here?
  }

  return input;
}
