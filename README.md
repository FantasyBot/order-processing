# Order Processing

This AWS CloudFormation template deploys a serverless application for order processing.

## Architecture Overview

The architecture consists of the following AWS services:

- AWS Lambda functions
- AWS Step Functions
- Amazon API Gateway
- Amazon SQS
- Amazon DynamoDB
- Amazon EventBridge

<!-- ![Architecture Overview](https://user-images.githubusercontent.com/12345678/123456789/abcdef/architecture.png) -->

## Deployment

To deploy the application, follow these steps:

1. Create a new CloudFormation stack using this template.
2. Set the `Environment` parameter to either `dev` or `prod`.
3. Wait for the stack to finish creating.

## Resources

The template creates the following AWS resources:

- `ApiGateway`: An Amazon API Gateway instance that routes incoming requests to the `OrderProcessing` Step Function.
- `OrderProcessingTrigger`: An AWS Lambda function that triggers the `OrderProcessing` Step Function when an order is received.
- `CheckInventory`: An AWS Lambda function that checks the inventory for the requested products.
- `VerifyPayment`: An AWS Lambda function that verifies the payment for the order.
- `CreateShippingLabel`: An AWS Lambda function that creates the shipping label for the order.
- `SendConfirmationEmail`: An AWS Lambda function that sends a confirmation email to the customer.
- `OrderProcessingDLQ`: An Amazon SQS dead-letter queue for the `OrderProcessing` Step Function.
- `MyProductsTable`: An Amazon DynamoDB table for storing product information.
- `OrderProcessing`: An AWS Step Function that processes incoming orders.

## Parameters

The following parameters can be set when creating the CloudFormation stack:

- `Environment`: The environment to deploy the application to. Must be either `dev` or `prod`.

## Globals

The following global settings are applied to all Lambda functions:

- `Timeout`: The maximum amount of time the function can run before it times out.
- `MemorySize`: The amount of memory the function is allocated.
- `Runtime`: The runtime environment for the function.
- `CodeUri`: The location of the function's source code.
- `Architectures`: The CPU architectures that the function supports.

## License

This project is licensed under the MIT License. See LICENSE.md for more information.
