
## Creating an end user login in Keystone

You need a username and password created for the user you wish to login as.  This is not your username, this is a credit union member's username and password.  You can do this by 
- navigating to a person in the transaction area
- right clicking on the person in the relationship tree
- login -> insert login
- Channel -> search for and locate "internet banking with passwords"
- ID is the username
- set login as "not locked" 
- click "insert"
- you should be prompted to enter a new password
- click "set password"

## Env for Vendor Login

In order to make this online banking application run, you will need to create a .env in the main file folder, NOT within the app folder, the entire project folder.

Within that .env file folder you need to create the following variables

vendorUser = your_user_name_for_the_logon_container
vendorPass = your_password_user_name_for_the_logon_container
CONNECTION_URL = http://your.url.to.database:PORT_NUMBER

These will be the same username, password, and url/port that were used to run a logon container and generate a sessionId in Keybridge Training. 


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## What is happening?

1. app/layout.js is loading app/page.js
2. app/page.js has a form that takes the end user's username and password
 - the username and password are used to try a loginVerify call to keybridge by sending sessionID, username, and password to app/api/endUserLogin/route.js
  -- This route.js holds the xml for the loginVerify call
 - if there is a session not found exception or if session ID is null (which it is initializes to) then an end user logon call is made by sending an API request to app/api/vendorLogin/route.js
  -- this API call then sends the XML for a logon container to keybridge
 - Now with a working session Id, the end user login (loginVerify) is tried again
 - This takes the serial numbers needed and stores them into sessionStore.js
 - Then, a postingStatus call is made to get account, share, and balance information.  This sends the loginSerial, personSerial, and sessionId to app/api/postingStatus/route.js 
  -- This route makes the xml call through keybridge
 - The users first and last name is stored, along with account information
 - The application reroutes to app/viewAccounts/page.js

