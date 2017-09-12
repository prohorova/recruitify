# Recruitify

WebApp for conducting polls. Allows user to invite customers to take a poll via email or sms. 

##### [Demo](http://recruitify24.herokuapp.com/)

## Run

Before running this app you need to copy .env.example file, rename it to .env and fill the missing values.
MONGO_URI is your database ui. If you want to use a local database you need to have an instance of Mongodb running.
SENDGRID_USERNAME and SENDGRID_PASSWORD are needed to send emails. 
TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER are needed to send sms messages.

After you've done it you need to install dependencies by running

```npm install```

and laungh the app by running

```npm run dev```





