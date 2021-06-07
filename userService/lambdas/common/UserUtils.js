'use strict';

const faker = require('faker');

const UserUtils = {

    async generateFakeUsers(limit) {
        // Divide requests into small groups(25 req per group).
        let batchList = []
        let data = []

        for (var i = 0; i < limit; i++) {

            let newItem =
            {
                PutRequest: {
                  Item: {
                    "email": faker.internet.email(),
                    "fullName": faker.name.findName(),
                    "phoneNumber": faker.phone.phoneNumber()
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