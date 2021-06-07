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

const Dynamo = {

    async init(TableName) {
      // Check if the table has any data generated before.
      const params = {
        TableName: TableName,
        ProjectionExpression: "email"
      };

      const data = await dynamoDb.scan(params).promise();
      if(!data || !data.Items) {
          throw Error('There is an error scanning the data.');
      }
      // If table is not empty, remove all data.
      if(data.Count > 0) {
        // TODO: Clean up the table

      }
      
      return true;

    },

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
      return true;
    },

    // TODO: Query

};

module.exports = Dynamo;