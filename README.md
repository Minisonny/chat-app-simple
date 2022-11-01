# Chat app

## Getting started

First make sure you have [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/) installed. Once those are installed, you can get the app up and running with the following command. This would spin up all services.

```
cp .env.example .env
docker-compose up --build
```

Our UI is served at port 3000. Locate yourself to https://localhost:3000 after seeing success compilation message in the terminal.

## Notes
- Okay you might wonder what kind of UI component library I'm using here. So yeah this is like a job interview assignment.
- I have little experience with TypeScript, so this is what I can do.
- The app would be developed further, and this is some preliminary layout.
- Mostly I want to play with TS and some React things here.

## Features
- Authentication
    - User can register to the chat application
    - User can log in with username and password
    - A logged in user can log out from the application
- Chat (User should be logged in for all of the following cases)
    - User can add new threads to the application
        - User needs to input the name of the thread
        - User needs to select participant to start the thread with
    - User can see threads where the user belongs
        - User belongs to a thread if the user created the thread
        - User belongs to a thread if the user was added to the thread as a participant
    - User can view messages in a thread
        - All users viewing that thread should see the new message added in real-time
    - User can add messages to a thread
