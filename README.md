# pcf-openai

With this PCF, you can add suggestions and answers for different questions for needed use cases. For example, you want to ubnderstand the possible responsilities of different job roles for each contact in your CRM:

![image](https://user-images.githubusercontent.com/22028493/211194146-ef58da7f-ccfb-49ee-a294-e802898366e5.png)

You simply add the control to the text field (example create a custom field OpenAIresponse):
![image](https://user-images.githubusercontent.com/22028493/211194270-090ccaa6-d814-4885-aa08-bd7cc9e3d6b1.png)

The Question Text is a request you want to make.
The Question Parameter is a parameter that goes at the end of the question when making an API request to OpeanAI:

![image](https://user-images.githubusercontent.com/22028493/211194322-f679fd75-4e30-4409-94eb-bc7e34ea6215.png)

So, the resulted request looks like this: 
- What are the responsibilities of the **Software engineer**?

Before starting to use the control - follow these steps:
- Navigate to https://beta.openai.com/account/api-keys to get your OpenAI API key. Copy it.
- In your Dataverse environment create an Environment variable to store the API key, paste key as a current value.
- Add control for a selected text attribute ("Result Attribute" parameter) and set up the "Environment Variable OpenAI API Key" parameter value to the schema name of the new Environment variable from previous steps.
- Set up the Question Text and Question parameter
