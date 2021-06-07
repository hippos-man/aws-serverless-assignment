'use strict';

const Dynamo = require('../common/Dynamo');
const Responses = require('../common/Responses');
const UserUtils = require('../common/UserUtils');

const tableName = process.env.tableName;

module.exports.handler = async (event) => {

  const isInitialized = await Dynamo.init(tableName)
    .catch(err => {
      console.log('Error in cleaning up the table.', err);
      return false;
  });

  if(!isInitialized) {
    return Responses._400(
      {
        message: 'Unable to initialize the table.'
      }
    );
  }
    
  // Generate fake user objects
  const fakeUsers = await UserUtils.generateFakeUsers(1200);

  if(!fakeUsers) {
    return Responses._400(
      { 
        message: 'Unable to generate fake user cards.'
      }
    );
  }

  // Put data into DynamoDB
  for (var i = 0; i < fakeUsers.length; i++) {
    const isSuccessful = await Dynamo.batchWrite(fakeUsers[i], tableName)
      .catch(err => {
        console.log('Error in dynamo write', err);
        return null;
    });

    // Return result
    if(!isSuccessful) {
      console.log('Error occurred in batch process.')
    }
  }

  return Responses._200({message: 'Successfully users populated.'});

};
