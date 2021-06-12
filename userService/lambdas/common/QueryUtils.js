'use strict';

const QueryUtils = {

    async buildParams(tableName, queryString) {

        const userIdString = queryString.user_id || '';
        const departmentName = queryString.department_name || '';
        const userName = queryString.user_name || '';

        let params = {
          TableName: tableName,
          KeyConditionExpression: '',
          ExpressionAttributeNames: '',
          ExpressionAttributeValues: ''
        }

        if(userIdString !== '') {

            const userId = parseInt(userIdString);
            params.KeyConditionExpression = "#uid = :uid";
            params.ExpressionAttributeNames = {"#uid": "userId"};
            params.ExpressionAttributeValues = {":uid": userId};

        } else if (departmentName !== '') {

            const indexName = 'departmentIndex';
            params.IndexName = indexName;

            if (userName !== '') {
              params.KeyConditionExpression = "#dn = :dname and begins_with(#fn, :uname)";
              params.ExpressionAttributeNames = {
                "#dn": "departmentName",
                "#fn": "fullName"
              };
              params.ExpressionAttributeValues = {
                ":dname": departmentName,
                ":uname": userName
              };

            } else {
              params.KeyConditionExpression = "#dn = :dname";
              params.ExpressionAttributeNames = {"#dn": "departmentName"};
              params.ExpressionAttributeValues = {":dname": departmentName};

            }
        }

        return params;
        
    },
    
};

module.exports = QueryUtils;