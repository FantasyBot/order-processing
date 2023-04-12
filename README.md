# Order Processing Application

This repository contains the CloudFormation template for deploying the Order Processing Application on AWS. The application uses AWS Serverless technologies to process orders, verify payments, and create shipping records.

![Flow](https://order-processing-public-pucket.s3.eu-central-1.amazonaws.com/flow.png)

## Architecture

The application is built using the following AWS services:

- AWS Lambda
- AWS Step Functions
- AWS API Gateway
- AWS DynamoDB
- AWS Simple Email Service (SES)
- AWS EventBridge (formerly CloudWatch Events)
- AWS SQS

## This repository contains integrations from:

- ### order-processing-dynamodb
- ### order-processing-lib
- ### order-processing-s3
- ### order-processing-secrets

#

## There are several steps to keep in mind:

- I am using github library `@fantasybot/order-processing-lib`  
   `.npmrc` file should be created with content:  
   `@fantasybot:registry=https://npm.pkg.github.com/`  
   `//npm.pkg.github.com/:\_authToken=your_github_classic_token`
- `AWS Named Profiles` configure it with your aws credentials and run:  
  `export AWS_PROFILE=your_profile_name && sam build && sam deploy --config-env dev`  
  you alsow need to install `sam-cli`

#

## AWS SES

AWS SES in free tier has only 200 email in a day for free (6200 in month).  
without encreasing limits had to verify every email - `sender` and `receiver`  
If you encrease the limit (not free tier as I know) you would be able to send 50000 email each month  
and you have to verify ONLY `sender` email.

TO VERIFY EMAIL WITH CLI:  
`aws ses verify-email-identity --email-address your-email-address --region eu-central-1`

LIST VERIFIED ADRESSES:  
`aws ses list-identities --region eu-central-1`

#
