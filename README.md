# Jobly - Frontend React
Fullstack job searching and job applying app built with a React frontend, Express backend, and PostgreSQL database. It was built during my coding bootcamp at Rithm School. 

Frontend and backend repositories were split for deployment. The backend repository can be found [here](https://github.com/s34n-k1m/jobly-backend-express). 

Deployed demo can be seen [here](https://jobly.demo.seanmkim.com/).

# Features
Jobly allows users to:
* Sign up/login  -  Authentication and authorization middleware protects certain routes so that only logged in users can only view certain pages  
* Edit user profile info
* Browse and search for companies by name
* Browse and search for jobs by job title
* View the jobs posted by each company
* Click an Apply button  -  Jobly remembers which jobs the user applied to

# Getting Started on the Server-side 
Clone the [backend repository](https://github.com/s34n-k1m/jobly-backend-express)  
`cd jobly-backend-express`   
`npm install`  
`createdb jobly`  
`createdb jobly-test`  
`psql jobly < data.sql`  
`npm start`  

# Getting Started on the Client-side
Clone this repository  
`cd jobly-frontend-react`  
`npm install`  
`npm start`

# Authors
My pair for server side was @Win-C  
My pair for client side was @jonathanlei  

# Acknowledgments
Although I wrote a [version](https://github.com/Win-C/jobly) of the backend separately, the deployed version of this app uses the backend written by Rithm School. The reason was so that each pair could start with the same codebase when building out the React frontend.