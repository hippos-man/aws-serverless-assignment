# About the project

This project is to understand how to develop AWS lambda application with Serverless Framework.

# Getting Started

## Installation

1. Clone the repo

```bash
clone git@github.com:hippos-man/aws-serverless-assignment.git
```

2. Move to main directory

```bash
cd aws-serverless-assignment/userService
```

3. Install npm

```bash
npm install
```

4. Install DynamoDb local

```bash
sls dynamodb install
```

## Usage

1. Start serverless offline with dynamodb local

```bash
npm run start
```

2. Invoke Populate users lambda function

```bash
npm run populate-users
```

3. Invoke Query users lambda function (by user ID)

```bash
npm run query-user-by-userid
```

4. Invoke Query users lambda function (by department name & user name)

```bash
npm run query-users-by-department-and-username
```

5. Use cURL to invoke query lambda function

```bash
curl -v http://localhost:3000/users?user_id=30
```
