import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
 
const client = new DynamoDBClient({ region: "us-east-1" });
const dynamoDB = DynamoDBDocumentClient.from(client);
const TableName = "users";
 
 
export const addUsers = async (event)=> {
  const body = JSON.parse(event.body || "{}");
  const { name, userId } = body;
 
  if (!userId || !name) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Price and name required" })
    };
  }
 
  await dynamoDB.send (new PutCommand({ TableName: TableName, Item: { name, userId } }));
  return {
    statusCode: 201,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ message: "User added" })
  };
};
 
// export const getStudents = async ()=> {
//   const result = await dynamoDB.send(new ScanCommand({ TableName }));
//   return { statusCode: 200, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify(result.Items) };
// };