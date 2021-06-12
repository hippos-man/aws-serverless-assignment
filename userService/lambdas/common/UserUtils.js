'use strict';

const faker = require('faker');

const UserUtils = {

    async generateFakeUsers(limit) {
        // Divide requests into small groups(25 req per group).
        let batchList = []
        let data = []
        let userId = 1;

        for (var i = 0; i < limit; i++) {

            let firstName = faker.name.firstName();
            let lastName = faker.name.lastName();
            let newItem =
            {
                PutRequest: {
                  Item: {
                    "userId": userId++,
                    "fullName": firstName + ' ' + lastName,
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": faker.internet.email(),
                    "departmentName": getDepartmentName()
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
 
const getDepartmentName = () => {
    const departments = {
        items: [
            "finance",
            "IT",
            "business",
            "customer",
            "QA",
            "marketing",
            "sales",
            "HR"
        ]
    }
    return departments.items[Math.floor(Math.random() * departments.items.length)];
};

module.exports = UserUtils;