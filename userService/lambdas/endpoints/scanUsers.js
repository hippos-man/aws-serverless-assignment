'use strict';

const DynamoClient = require('../common/DynamoClient');
const Responses = require('../common/Responses');

const tableName = process.env.tableName;

module.exports.handler = async (event) => {

    console.log('Scanning for test...');

    const data = await DynamoClient.scan(tableName).catch(err => {
        console.log('Error occurred in query operation.', err);
        return null;
    });

    if(!data) {
        return Responses._500(
            { 
                message: 'Unexpected error occurred in executing query.'
            }
        );
    }
    console.log('Scan users Done!');
    return Responses._200(data);
}

