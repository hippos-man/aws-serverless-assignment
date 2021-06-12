'use strict';

const AWS = require('aws-sdk');

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000"
});

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: 'us-east-1',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY',
    secretAccessKey: 'DEFAULT_SECRET'
  };
}

const dynamoDb = new AWS.DynamoDB.DocumentClient(options);

const DynamoClient = {

    async batchWrite(data, tableName) {
      const params = {
        RequestItems: {
          [tableName]: data.requestGroup
        }
      };

      const response = await dynamoDb.batchWrite(params).promise();

      if(!response) {
        throw Error('There is an error in batch operation.');
      }
      return response;
    },

    async queryByUserId(userId, tableName) {
      const params = {
        TableName: tableName,
        KeyConditionExpression: "#id = :number",
        ExpressionAttributeNames: {
          "#id": "userId"
        },
        ExpressionAttributeValues: {
          ":number": userId
        }
      }

      const data = await dynamoDb.query(params).promise();

      if(!data || !data.Items) {
        throw Error('There is an error in query execution.');
      }
      console.log(data);
      return data.Items;
    },

    // TODO: Query by department name & user name
    async queryByDepartmentNameAndUserName(departmentName, userName) {
      
    },

    // Test purpose only
    async scan(TableName) {
      const params = {
          TableName: TableName,
          ProjectionExpression: "userId, fullName, email, departmentName"
      };
      const data = await dynamoDb.scan(params).promise();
      if(!data || !data.Items) {
          throw Error('There is an error scanning the data.');
      }
      
      return data;
  },

};

module.exports = DynamoClient;