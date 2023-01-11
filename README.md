# pcf-openai [![GitHub](https://img.shields.io/github/license/ElizabethAkin/pcf-openai?style=flat-square)](LICENSE)

Power Platform custom control (PCF) to interact with OpenAI.

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Power Platform CLI for Windows](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction#install-power-platform-cli-for-windows)

## Installation

### Step 1

To install package dependencies, execute the following command.

```powershell
npm install
```

### Step 2

To build `pcf-openai`, execute the following command.

```powershell
npm run build
```

### Step 3

To create `PCF_OpenAI` folder

```powershell
mkdir PCF_OpenAI
```

### Step 4

To navigate to `PCF_OpenAI` folder, execute the following command.

```powershell
cd PCF_OpenAI
```

### Step 5

To create solution project, execute the following command.

```powershell
pac solution init --publisher-name <enter your publisher name> --publisher-prefix <enter your publisher prefix>
```

### Step 6

To add project reference to the solution, execute the following command.

```powershell
pac solution add-reference --path ../
```

### Step 7

To generate zip file from the solution project, execute the following command.

```powershell
msbuild /t:build /restore
```

### Step 8

To publish `pcf-openai`, do the following steps.

1. Go to the entity form configuration
2. Open the control which will be configured depends on the PCF control type
3. Go to `Controls`
4. Click `Add Control` to choose the new control and configure Web, Phone, Tablet options
5. Publish

## Specification

### Properties

- Result Attribute - Target attribute that will display PCF control
- Question Text - Question that you want to ask in OpenAI
- Question Parameter - The question parameter for query
- OpenAI API Key Environment Variable - The environemnt variable to store OpenAI API Key retrieved from [https://beta.openai.com/account/api-keys](https://beta.openai.com/account/api-keys).

## Basic Usage

For example, you want to understand the possible responsilities of different job roles for each contact in your CRM:

![image](https://user-images.githubusercontent.com/22028493/211194146-ef58da7f-ccfb-49ee-a294-e802898366e5.png)

You simply add the control to the text field (example create a custom field OpenAIresponse):
![image](https://user-images.githubusercontent.com/22028493/211194270-090ccaa6-d814-4885-aa08-bd7cc9e3d6b1.png)

The Question Text is a request you want to make.
The Question Parameter is a parameter that goes at the end of the question when making an API request to OpeanAI:

![image](https://user-images.githubusercontent.com/22028493/211194322-f679fd75-4e30-4409-94eb-bc7e34ea6215.png)

So, the resulted request looks like this: 
- What are the responsibilities of the **Software engineer**?

## License

This project is licensed under the [MIT license](LICENSE).