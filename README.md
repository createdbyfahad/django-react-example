# Django & React :heart:
An example of an app (Simple Notes) built using Django as a backend, and fully seperate React app as a front end. It uses jwt-token in user authorization.

## How to run
After cloning the repo, do the following to setup the app:<br />
1- from the backend folder, execute those lines:
```
source env/bin/activate
pip install -r requirements.txt
python manage.py createsuperuser
python manage.py runserver
```
2- the django server should now be up and running. <br />
3- from the frontend folder, execute those lines:
```
npm install
npm start
```
4- now go to the url located after `Access URLs:` <br/>
5- and you should see the website in the browser <br />

## About the project
In this project, I try to provide a simple boilerplate for anyone who wants to use Django as a backend, and offer jwt-auth based API. <br />
Also, I implemented a simple notes app example using React ([react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)). In case you have any questions about the code, please feel free to ask. <br />
