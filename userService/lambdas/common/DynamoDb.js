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

        try {

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
                TableName: tableInfo.Table.TableName
            };

            await createTable(createTableParams);

        } catch(err) {
            throw Error('There is an error in table operation.');
        }

        console.log('Table Cleaning Done!');
        return true;

    },

};


const fetchTableInfo = (params) => {
    const response = Dynamo.describeTable(params).promise();
    if(!response) {
        throw Error('Error occurred in fetching existing table info.');
    }
    return response;
};

const dropTable = (params) => {
    const response = Dynamo.deleteTable(params).promise();
    if(!response) {
        throw Error('Error occurred in dropping table.');
    }
    return response;
};

const waitForDropped = (params) => {
    const response = Dynamo.waitFor('tableNotExists', params).promise();
    if(!response) {
        throw Error('Error occurred in dropping table.');
    }
    return response;
};

const createTable = (params) => {
    const response = Dynamo.createTable(params).promise();
    if(!response) {
        throw Error("Error occurred in creating table.")
    }
    return response;
};


module.exports = DynamoDb;