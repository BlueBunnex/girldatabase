// DynamoDB utility functions
import { QueryCommand } from "@aws-sdk/client-dynamodb";

async function fetchPostsFromBoard(tableName, dynamoDBClient, theDirectoryWeWant, limit = 5, startAfterPostId = null,)
{
    theDirectoryWeWant = `/${theDirectoryWeWant}/`;
    try {
        const params = {
            TableName: tableName, // Replace with your DynamoDB table name
            KeyConditionExpression: "#pk = :boardId", ExpressionAttributeNames: {
                "#pk": "dir",
            }, ExpressionAttributeValues: {
                ":boardId": {S: theDirectoryWeWant},
            }, ScanIndexForward: false, // Set to false to get the newest posts first
            Limit: limit,
        };

        if (startAfterPostId) // If starting after a specific post, include the ExclusiveStartKey in the query
        {
            params.ExclusiveStartKey = {
                "dir": {S: theDirectoryWeWant}, "unix": {S: startAfterPostId},
            };
        }
        const command = new QueryCommand(params);
        const {Items, LastEvaluatedKey} = await dynamoDBClient.send(command);
        // Process and return the fetched items, along with the last evaluated key for pagination
        const processedItems = Items.map(item => ({
            theDir: item.dir.S,
            imageUrl: item.imgURL?.S || "",
            comments: item.comments?.S || "",
            theFileName: item.ogfilename?.S || "",
            theText: item.text?.S || "",
            theUnix: item.unix.N || "",
        }));
        return {
            items: processedItems, lastEvaluatedKey: LastEvaluatedKey ? LastEvaluatedKey.unix.S : null,
        };
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Failed to fetch posts");
    }
}

module.exports = fetchPostsFromBoard;
