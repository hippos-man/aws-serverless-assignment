'use strict';

const DynamoClient = require('../common/DynamoClient');
const Responses = require('../common/Responses');
const QueryUtils = require('../common/QueryUtils');

const tableName = process.env.tableName;

module.exports.handler = async (event) => {

    const queryString = event.queryStringParameters;
    const queryParams = await QueryUtils.buildParams(tableName, queryString).catch(err => {
        console.log('Error occurred in processing query parameters.', err);
        return null;
    });

    if(!queryParams) {
        return Responses._400(
            {   
                status: 400,
                message: 'Bad request with invalid request parameters.'
            }
        );
    }

    const data = await DynamoClient.query(queryParams, tableName).catch(err => {
        console.log('Error occurred in query operation.', err);
        return null;
    });

    if(!data) {
        return Responses._500(
            {   
                status: 500,
                message: 'Unexpected error occurred in executing query.'
            }
        );
    }

    return Responses._200(
        {
            status: 200,
            data: data
        }
    );
}
