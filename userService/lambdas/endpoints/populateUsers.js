'use strict';

const DynamoClient = require('../common/DynamoClient');
const Responses = require('../common/Responses');
const DynamoDb = require('../common/DynamoDb');
const UserUtils = require('../common/UserUtils');

const tableName = process.env.tableName;

module.exports.handler = async (event) => {

  console.log('Started initializing users table.');
  // Refresh Users table
  const isCleanedUp = await DynamoDb.refresh(tableName).catch(err => {
    console.log('Error in dynamodb operation.', err);
    return null;
  });

  if(!isCleanedUp) {
    return Responses._500(
      { 
        message: 'Unexpected error occurred in initializing table.'
      }
    );
  }

  // Generate fake user objects
  const fakeUsers = await UserUtils.generateFakeUsers(1200);

  if(!fakeUsers) {
    return Responses._500(
      { 
        message: 'Unexpected error occurred in generating fake user cards.'
      }
    );
  }

  console.log('Populating test users...');
  // Put data into DynamoDB
  for (var i = 0; i < fakeUsers.length; i++) {
    const isSuccessful = await DynamoClient.batchWrite(fakeUsers[i], tableName)
      .catch(err => {
        console.log('Error in dynamo write', err);
        return null;
    });

    // Return result
    if(!isSuccessful) {
      console.log('Error occurred in batch process.');
      return Responses._500(
        { 
          message: 'Unexpected error occurred in generating fake user cards.'
        }
      );
    }
  }
  console.log('Populate users Done!')
  return Responses._200({message: 'Successfully users populated.'});

};
