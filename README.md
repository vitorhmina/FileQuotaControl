# File Quota Control - Web Application

## Overview
The **File Quota Control** project was developed for the **Project III** curricular unit of the Degree in Informatics Engineering at the **Polytechnic Institute of Viana do Castelo**. The application is designed to manage file storage quotas for companies, allowing users to upload, manage, categorize, and share files. 

## Key Features
- **User Authentication**: Admins and users can register and log in.
- **File Management**: Users can upload, delete, categorize, and archive files.
- **Quota Allocation**: Companies are assigned a 100GB base quota for file storage.
- **Tagging System**: Files and folders can be tagged with colors for categorization.
- **Sharing**: Files and folders can be shared via public or company-specific links.
- **User Roles**: 
  - **Administrator**: Manages users and companies.
  - **User**: Uploads files, manages quotas, and organizes files within a company.

## Technologies Used
This project employs a modern web development stack, leveraging the following technologies:

### Frontend:
- **Angular**: A popular framework for building single-page applications (SPAs) in JavaScript.
- **HTML/CSS**: For structuring and styling the web pages.

### Backend:
- **Grails**: A powerful web application framework built on Groovy and Java.
- **MariaDB**: An open-source relational database for data management.

## Prerequisites
Before you can run the application locally, make sure you have the following tools installed:

- **Node.js**: [Download Node.js](https://nodejs.org/en/download/)
- **Angular CLI**: Install using `npm install -g @angular/cli`
- **Java Development Kit (JDK 11)**: [Download JDK 11](https://www.oracle.com/java/technologies/downloads/)
- **Grails Framework**: [Download Grails](https://grails.org/download.html)
- **Git**: [Download Git](https://git-scm.com/download/win)
- **MariaDB**: [Download MariaDB](https://mariadb.org/download/)

  


## Project Setup

First, clone the repository from the `main` branch:

```bash
git clone -b main https://github.com/vitorhmina/FileQuotaControl.git
```
Open Intellij create a new project from existing sources:

![enter image description here](https://i.imgur.com/dJVBCkV.png)


Choose the project folder and follow the import steps:

<p align="center">
  <img src="https://i.imgur.com/cQNSyzt.png">
</p>
<p align="center">
  <img src="https://i.imgur.com/4j4y6VE.png">
</p>
<p align="center">
  <img src="https://i.imgur.com/Rceuc8t.png">
</p>
<p align="center">
  <img src="https://i.imgur.com/mxcL7BQ.png">
</p>
<p align="center">
  <img src="https://i.imgur.com/FMuYSes.png">
</p>
<p align="center">
  <img src="https://i.imgur.com/0R25nV4.png">
</p>

At this point the project should open on **IntelliJ** and it should be detected automatically that it is a **Gradle** project:

<p align="center">
  <img src="https://i.imgur.com/rfsYDVW.jpeg">
</p>

In case it doesn’t detect it automatically you can import it through the **settings.gradle** file

<p align="center">
  <img src="https://i.imgur.com/rnFWe1A.png">
</p>

Go to the `external-configuration` folder and copy the external configuration file:

<p align="center">
  <img src="https://i.imgur.com/MtMQEjG.png">
</p>

Place the file in the external folder for your project, you can find the application name in the file **Application.groovy**:

<p align="center">
  <img src="https://i.imgur.com/1jwLHrG.png">
</p>

<p align="center">
  <img src="https://i.imgur.com/a2INCp9.png">
</p>

In this file you need to specify the database to be able to connect:

<p align="center">
  <img src="https://i.imgur.com/nvCzCno.jpeg">
</p>

Now, to start the project you need to find the **package.json** file, left-click it and press the **Show npm scripts** option and the click start:

<p align="center">
  <img src="https://i.imgur.com/1upB0i8.png">
</p>

And for the backend you can run **bootRun** on the **Gradle** tab:

<p align="center">
  <img src="https://i.imgur.com/nhbslEj.png">
</p>

Once everything is running, you can open the application in your browser at: **[http://localhost:1212](http://localhost:1212)**
