# Online Learning Platform

## Table of Contents
- [Project Description](#project-description)
- [Tools and Frameworks](#tools-and-frameworks)
- [Coding Style](#coding style)
- [Installation] (#installation)
- [Features](#features)
  * [Admin Functionalities](#administrator)
  * [User/Guest Functionalities](#user)
- [API References](#api-references)
  * [Admin Router](#admin-router)
  * [User Router](#user-router)

## Project Description

### Course 
Advanced Computer Lab (CSEN 704/ DMET 706), Winter 2022

### Theme
The theme of the project, is to create a complete Online learning platform. a learning platform is a web application through which Instructors can provide their courses online and individuals can join these courses.
Such websites include Coursera.com, Udacity.com, and Udemy.com

### Overview 
This project followed the Agile Methodology; meaning it was splited into Sprints, with
each Sprint lasting a set amount of time and a fully functioning version of the project
with the specified System Requirements should be submitted and evaluated.

### Objectives
- Learn how to properly use the Agile Methodology to plan out a project and develop
the software.
- Learn the process of following a given set of System Requirements to develop a
software.
- Learn to research and master the use of the MERN Stack.
- Learn how to work together as a team on GitHub and to handle conflicts. :sweat_smile:


## Tools and Frameworks
![MERN_STACK](https://www.sbr-technologies.com/wp-content/uploads/2021/07/Mern-Stack-Developer.png)

### What is the MERN Stack?
MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.

- MongoDB - document database
- Express(.js) - Node.js web framework
- React(.js) - a client-side JavaScript framework
- Node(.js) - the premier JavaScript web server

Express and Node make up the middle (application) tier. Express.js is a server-side web framework, and Node.js the popular and powerful JavaScript server platform. Regardless of which variant you choose, ME(RVA)N is the ideal approach to working with JavaScript and JSON, all the way through.

### How does the MERN stack work?
The MERN architecture allows you to easily construct a 3-tier architecture (frontend, backend, database) entirely using JavaScript and JSON.

![MERN_ARCH](https://webimages.mongodb.com/_com_assets/cms/mern-stack-b9q1kbudz0.png?auto=format%2Ccompress)

#### - React.js Front End
The top tier of the MERN stack is React.js, the declarative JavaScript framework for creating dynamic client-side applications in HTML. React lets you build up complex interfaces through simple Components, connect them to data on your backend server, and render them as HTML.

React’s strong suit is handling stateful, data-driven interfaces with minimal code and minimal pain, and it has all the bells and whistles you’d expect from a modern web framework: great support for forms, error handling, events, lists, and more.

#### - Express.js and Node.js Server Tier
The next level down is the Express.js server-side framework, running inside a Node.js server. Express.js bills itself as a “fast, unopinionated, minimalist web framework for Node.js,” and that is indeed exactly what it is. Express.js has powerful models for URL routing (matching an incoming URL with a server function), and handling HTTP requests and responses.

By making XML HTTP Requests (XHRs) or GETs or POSTs from your React.js front-end, you can connect to Express.js functions that power your application. Those functions in turn use MongoDB’s Node.js drivers, either via callbacks for using Promises, to access and update data in your MongoDB database.

#### - MongoDB Database Tier
If your application stores any data (user profiles, content, comments, uploads, events, etc.), then you’re going to want a database that’s just as easy to work with as React, Express, and Node.

That’s where MongoDB comes in: JSON documents created in your React.js front end can be sent to the Express.js server, where they can be processed and (assuming they’re valid) stored directly in MongoDB for later retrieval. Again, if you’re building in the cloud, you’ll want to look at Atlas. If you’re looking to set up your own MERN stack, read on!

## Coding Style 
This project is divided into two main parts, frontend and backend. Our backend is divide into routes that act as a middle point between the client and the database.

## Installation
In order to run our project, you should have the following installed in your machine:
 - [Node JS](https://nodejs.org/en/)
 - [NPM](https://www.npmjs.com/)
 - [React JS](https://react-cn.github.io/react/downloads.html) or you can use `NPM`
 - And you can choose any text editor.
 - [MongoDB](https://docs.mongodb.com/manual/installation/) either locally or on a cloud.
You have to create `.env` with the dbconnectionString.
     

## Features 
We have 2 main users in our website:
- Adminstrator
-  Guest can join AS 
   * Instructor
   * Individual trainee 
   * Corporate trainee
   
   
### Administrator
- Log in using his email and password.
- add another administrator with a set username and password.
- add instructor or corporate trainees and create their usernames and passwords.
- view course requests from corporate trainees.
- can set promotion for specific course, number of courses or all courses.


### Guest 
- select gender and country, view and accept the website payment policy.
- can view all courses with their total hours, price and rating.
- can filter the courses based on price, subject, or rating.
- can search for specific course based on instructor or subject and can see a preview video for this course 
- can view the most popular courses.
#### As an Instructor 
-  can sign up, log in, log out, change his mail, password or biography, receive an email for changing forgetten password
-  view and accept the contract with the website 
-  
-  
