## Please follow these steps to run the project

npm install<br/>
make file with the name .env.development (similar to .env.sample)<br/>
start mongodb service from terminal using the command:(you should have mongodb installed in your system)<br/>
sudo systemctl start mongod <br/>
npm start<br/>

## Import twitter clone postman collection attached with this project to Postman

### What I am using and why?

I have mocked the chat feature due to limited time but socket.io could have been used for real time chat service<br/>
I used json web tokens for authentication since APIs are stateless <br/>
For authentication, we need to send private token from every API call in header<br/>
I have done all the possible error handling so that the server won't break under any scenario<br/>
