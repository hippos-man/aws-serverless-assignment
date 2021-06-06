'use strict';

const AWS = require('aws-sdk');

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000"
});

// AWS.config.setPromisesDependency(require('bluebird'));

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

    // TODO: Initial check
    async initialCheck(TableName) {
      
    },

    // TODO: CleanUp
    async cleanUp(TableName) {
        
    },

    // TODO: Write (multiple items)
    async bulkWrite(data, tableName) {

      const params = {
        RequestItems: {
          [tableName]: data
        }
      };

      const response = await dynamoDb.batchWrite(params).promise();

        if (!response) {
            throw Error('There is an error in batch writing.');
        }

        return data;


    },

    // TODO: Query

};

module.exports = Dynamo;