# charts
Heroku deploy: https://aviv-charts.herokuapp.com/  
Dummy login with: username = username, password = password.
  
![image](https://user-images.githubusercontent.com/84678031/145182938-650b7571-0fb4-4041-b366-8b337e57342e.png)

## Install Guide - Docker  
### Frontend:  
```
docker build . -t charts-frontend
```
then:
```
docker run --rm -it -p 3000:3000/tcp charts-frontend:latest
```


These commands will run the frontend on port 3000. You can then navigate to http://localhost:3000/ to view it.
  
### Backend:  
```
docker-compose up
```
This command will run the backend server on port 3030. Also, a Mongo database will run on port 27017.

## Additional Notes
• While getting the random data points from the server, if there's an error -
the client will stop sending requests until a refresh is made, in order to prevent excessive redundant calls.  
• The interval clears on chart unmount in order to prevent a leak.  
• useInterval custom hook to deal with intervals.  
• This is my first docker deploy, so I hope everything is ok..    
