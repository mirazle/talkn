# 参照

https://amplify-sns.workshop.aws/ja/00_prerequisites/20_install_and_configs.html

# Install the AWS Amplify CLI

npm install -g @aws-amplify/cli@4.45.0

## amplify configure

ブラウザでログイン
EMAIL: mirazle2069@gmail.com
USER: miralze

## amplify configure

accessKey: AKIA22IF3K74C3GJPUQG
secretKey: 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

# Enter the access key of the newly created user:

? accessKeyId: \***\*\*\*\*\***
? secretAccessKey: **\*\*\*\***
This would update/create the AWS Profile in your local machine
? Profile Name: mirazle

Successfully set up the new user.

# amplify init

amplify init

```
:D cover (master *) $amplify init
Note: It is recommended to run this command from the root of your app directory
? Enter a name for the project startupHub
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: build
? Build Command:  npm run-script build
? Start Command: npm run-script start
Using default provider  awscloudformation
? Select the authentication method you want to use: AWS profile

For more information on AWS Profiles, see:
https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html

? Please choose the profile you want to use mirazle
Adding backend environment dev to AWS Amplify Console app: dkuqtu4l7cac4
⠦ Initializing project in the cloud...

CREATE_IN_PROGRESS DeploymentBucket              AWS::S3::Bucket            Wed Feb 09 2022 10:49:59 GMT+0900 (Japan Standard Time) Resource creation Initiated
CREATE_IN_PROGRESS UnauthRole                    AWS::IAM::Role             Wed Feb 09 2022 10:49:59 GMT+0900 (Japan Standard Time) Resource creation Initiated
CREATE_IN_PROGRESS AuthRole                      AWS::IAM::Role             Wed Feb 09 2022 10:49:59 GMT+0900 (Japan Standard Time)
CREATE_IN_PROGRESS DeploymentBucket              AWS::S3::Bucket            Wed Feb 09 2022 10:49:58 GMT+0900 (Japan Standard Time)
CREATE_IN_PROGRESS UnauthRole                    AWS::IAM::Role             Wed Feb 09 2022 10:49:58 GMT+0900 (Japan Standard Time)
CREATE_IN_PROGRESS amplify-startuphub-dev-104948 AWS::CloudFormation::Stack Wed Feb 09 2022 10:49:54 GMT+0900 (Japan Standard Time) User Initiated
⠦ Initializing project in the cloud...

CREATE_IN_PROGRESS AuthRole AWS::IAM::Role Wed Feb 09 2022 10:49:59 GMT+0900 (Japan Standard Time) Resource creation Initiated
⠧ Initializing project in the cloud...

CREATE_COMPLETE AuthRole   AWS::IAM::Role Wed Feb 09 2022 10:50:13 GMT+0900 (Japan Standard Time)
CREATE_COMPLETE UnauthRole AWS::IAM::Role Wed Feb 09 2022 10:50:13 GMT+0900 (Japan Standard Time)
⠋ Initializing project in the cloud...

CREATE_COMPLETE DeploymentBucket AWS::S3::Bucket Wed Feb 09 2022 10:50:20 GMT+0900 (Japan Standard Time)
⠦ Initializing project in the cloud...

CREATE_COMPLETE amplify-startuphub-dev-104948 AWS::CloudFormation::Stack Wed Feb 09 2022 10:50:23 GMT+0900 (Japan Standard Time)
✔ Successfully created initial AWS cloud resources for deployments.
✔ Initialized provider successfully.
Initialized your environment successfully.

Your project has been successfully initialized and connected to the cloud!

Some next steps:
"amplify status" will show you what you've added already and if it's locally configured or deployed
"amplify add <category>" will allow you to add features like user login or a backend API
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify console" to open the Amplify Console and view your project status
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

Pro tip:
Try "amplify add api" to create a backend API and then "amplify publish" to deploy everything
```

```
init                | Initializes a new project, sets up deployment resources in the cloud, and makes your project ready for Amplify.
configure           | Configures the attributes of your project for amplify-cli, such as switching front-end framework and adding/removing cloud-provider plugins.
push                | Provisions cloud resources with the latest local developments.
pull                | Fetch upstream backend environment definition changes from the cloud and updates the local environment to match that definition.
publish             | Executes amplify push, and then builds and publishes client-side application for hosting.
serve               | Executes amplify push, and then executes the project's start command to test run the client-side application locally.
status              | Shows the state of local resources not yet pushed to the cloud (Create/Update/Delete).
delete              | Deletes all of the resources tied to the project from the cloud.
<category> add      | Adds a resource for an Amplify category in your local backend
<category> update   | Update resource for an Amplify category in your local backend.
<category> push     | Provisions all cloud resources in a category with the latest local developments.
<category> remove   | Removes a resource for an Amplify category in your local backend.
<category>          | Displays subcommands of the specified Amplify category.
mock                | Run mock server for testing categories locally.
codegen             | Generates GraphQL statements(queries, mutations and eventHandlers) and type annotations.
env                 | Displays and manages environment related information for your Amplify project.
console             | Opens the web console for the selected cloud resource.
logout              | If using temporary cloud provider credentials, this logs out of the account.
```

# GCP

## clientId

429873683760-v2hk18nua5vgf37ae0ovuhfbdrmah42d.apps.googleusercontent.com

## crient secret

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

# Cognito

## UserPool

dev-users

- app client: 162h9kohj0a8vfebvn3m2rpltt
- app seecret: 188dukpsldobnnoh02t63njic1krknt407ssbpq5ehc4g17mh798
