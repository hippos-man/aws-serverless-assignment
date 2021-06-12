'use strict';

const AWS = require('aws-sdk');
const Dynamo = new AWS.DynamoDB();

AWS.config.update({
    region: "us-east-1",
    endpoint: "http://localhost:8000"
});

const DynamoDb = {

    async refresh(TableName) {

        const params = {
            TableName: TableName
        };

        const tableInfo = await fetchTableInfo(params);

        if(tableInfo && tableInfo.Table.ItemCount == 0) {
            return true;
        }

        console.log('Cleaning up existing data from the table...');

        await dropTable(params);

        await waitForDropped(params);

        const createTableParams = {
            AttributeDefinitions: tableInfo.Table.AttributeDefinitions,
            KeySchema: tableInfo.Table.KeySchema,
            ProvisionedThroughput: {
                ReadCapacityUnits: tableInfo.Table.ProvisionedThroughput.ReadCapacityUnits,
                WriteCapacityUnits: tableInfo.Table.ProvisionedThroughput.WriteCapacityUnits
            },
            GlobalSecondaryIndexes: [{
                "IndexName": tableInfo.Table.GlobalSecondaryIndexes[0].IndexName,
                "KeySchema": tableInfo.Table.GlobalSecondaryIndexes[0].KeySchema,
                "Projection": tableInfo.Table.GlobalSecondaryIndexes[0].Projection,
                "ProvisionedThroughput": {
                    "ReadCapacityUnits": tableInfo.Table.GlobalSecondaryIndexes[0].ProvisionedThroughput.ReadCapacityUnits,
                    "WriteCapacityUnits": tableInfo.Table.GlobalSecondaryIndexes[0].ProvisionedThroughput.WriteCapacityUnits
                }
            }],
            TableName: tableInfo.Table.TableName
        };

        await createTable(createTableParams);

        await waitForCreated(params);

        return true;

    },

};


const fetchTableInfo = (params) => {
    const response = Dynamo.describeTable(params).promise();
    return response;
};

const dropTable = (params) => {
    const response = Dynamo.deleteTable(params).promise();
    return response;
};

const waitForDropped = (params) => {
    const response = Dynamo.waitFor('tableNotExists', params).promise();
    return response;
};

const waitForCreated = (params) => {
    const response = Dynamo.waitFor('tableExists', params).promise();
    return response;
};

const createTable = (params) => {
    const response = Dynamo.createTable(params).promise();
    return response;
};


module.exports = DynamoDb;