'use strict';

const DynamoClient = require('../common/DynamoClient');
const Responses = require('../common/Responses');

const tableName = process.env.tableName;

module.exports.handler = async (event) => {

    const queryString = event.queryStringParameters;
    const userIdString = queryString.user_id || '';
    const departmentName = queryString.departmentName || '';
    const userName = queryString.userName || '';
    
    console.log('Querying for user ID = ', userIdString);

    let userId;

    try {
        userId = parseInt(userIdString);
    } catch (err) {
        return Responses._400(
            {   
                status: 400,
                message: 'Invalid request parameters.'
            }
        )
    }

    // Execute query
    const data = await DynamoClient.queryByUserId(userId, tableName).catch(err => {
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

