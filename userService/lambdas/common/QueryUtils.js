'use strict';

const QueryUtils = {

    async generateParams(tableName, queryString) {
        const userIdString = queryString.user_id || '';
        const departmentName = queryString.department_name || '';
        const userName = queryString.user_name || '';
        let params;

        // TODO: Refactor
        if(userIdString !== '') {
            
            const userId = parseInt(userIdString);
            params = {
                TableName: tableName,
                KeyConditionExpression: "#id = :number",
                ExpressionAttributeNames: {
                  "#id": "userId"
                },
                ExpressionAttributeValues: {
                  ":number": userId
                }
            }

        } else if (departmentName !== '') {
            const indexName = 'departmentIndex';
            if (userName !== '') {
                params = {
                    TableName: tableName,
                    IndexName: indexName,
                    KeyConditionExpression: "#dn = :dname and begins_with(#fn, :uname)",
                    ExpressionAttributeNames: {
                      "#dn": "departmentName",
                      "#fn": "fullName"
                    },
                    ExpressionAttributeValues: {
                      ":dname": departmentName,
                      ":uname": userName
                    }
                }

            } else {
                params = {
                    TableName: tableName,
                    IndexName: indexName,
                    KeyConditionExpression: "#dn = :dname",
                    ExpressionAttributeNames: {
                      "#dn": "departmentName"
                    },
                    ExpressionAttributeValues: {
                      ":dname": departmentName
                    }
                }
            }
        }

        return params;
        
    },
    
};

module.exports = QueryUtils;