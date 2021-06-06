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
  const fakeUsers = [
    {
      PutRequest: {
        Item: {
          "email": "john@gmail.com",
          "fullName": "John Doe",
          "phoneNumber": "89003388"
        }
      }
    },
    {
      PutRequest: {
        Item: {
          "email": "sho@gmail.com",
          "fullName": "Sho Tanaka",
          "phoneNumber": "55008800"
        }
      }
    },
    {
      PutRequest: {
        Item: {
          "email": "kelly@gmail.com",
          "fullName": "Kelly Slater",
          "phoneNumber": "55098800"
        }
      }
    },
    {
      PutRequest: {
        Item: {
          "email": "sally@gmail.com",
          "fullName": "Sally Doe",
          "phoneNumber": "55708800"
        }
      }
    },
 ]
  // const fakeUsers = await UserUtils.populate(1200);

  // TODO: Put data into DynamoDB
  const isSuccessful = await Dynamo.bulkWrite(fakeUsers, tableName)
    .catch(err => {
      console.log('Error in dynamo write', err);
      return null;
  });

  // Return result
  if(!isSuccessful) {
    return Responses._400(
      { 
        message: 'Unable to populate users.'
      }
    );
  }

  return Responses._200({message: 'Successfully users populated.'});

};
