'use strict';

const uuid = require('uuid');

const UserUtils = {

    async populate(limit) {
        // Divide requests into small groups(25 req per group).
        let batchList = []
        let data = []

        // TODO: Use third party to generate fake data
        for (var i = 0; i < limit; i++) {
            let newItem =
            {
                PutRequest: {
                  Item: {
                    "email": uuid.v1() + "@gmail.com",
                    "fullName": "John Doe",
                    "phoneNumber": "89003388"
                  }
                }
            }
            
            data.push(newItem);

            if(data.length == 25){
                batchList.push({
                    requestGroup: data
                });

                data = [];
            }
        }

        return batchList;
    },

};

module.exports = UserUtils;