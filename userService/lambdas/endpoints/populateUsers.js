'use strict';

const Dynamo = require('../common/Dynamo');
const Responses = require('../common/Responses');
const UserUtils = require('../common/UserUtils');
const tableName = process.env.tableName;

module.exports.handler = async (event) => {
  // TODO: Database Init
  // const isTableEmpty = await Dynamo.initialCheck(tableName)
  //   .catch(err => {
  //     console.log('Error in checking table.', err);
  //     return null;
  // });

  // if (!isTableEmpty) {
  //   // TODO: Remove all
  //   const isCleanedUp = await Dynamo.cleanUp(tableName).catch(err => {
  //     console.log('Error in cleaning up table.', err);
  //     return null
  //   });

  //   if(!isCleanedUp) {
  //     return Responses._400(
  //       {
  //         message: 'Unable to remove data in the table.'
  //       }
  //     );
  //   }
    
  // }

  // TODO: Generate fake user objects
  const fakeUsers = await UserUtils.populate(1200);

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
