# CarFleetManager
by Michael Assyag

Full server & client for managing car fleet with saving the fleet state in an external resource

## Getting Started

The crawler runs only on console at the moment.

Important: I haven't had the time to make the requirements.txt to install properly. I looked it up and found that many people had the strugle for installing internal dependencies via 'pip3 install -r requirements.txt'

### Prerequisites

You need to have the following installed:
*[Node.js](https://nodejs.org/en/)
*[npm](https://www.npmjs.com/)
*[Redis](https://redis.io/)

### Getting Started

First of all we start by installing the node modules for the client app and for our server
In each of our source dirs we run the following command 
(clientapp: .../CarFleetManager/car-fleet-manager, server side: .../CarFleetManager/serverapp-manager)

```
  npm install
```

## Deployment

### Deploy Client UI server (serving our pages to the client)

Run the following command in the directory:

```
    npm run dev
```
If this command failed you might need to delete 'package-lock.json' and check if there is a 'static' dir

### Run the Server side

Run the following command in the directory:

```
    node bin\www
```

## Few Notes
I have few minor things left but these are primarily CSS tweaks to make the UI more responsive

### Built with

* [VueJs](http://docs.python-requests.org/en/master/) - Simple MV FE framework
* [NodeJs](https://nodejs.org/en/) - Interperter for developing RESTful API server
* [Redis](https://redis.io/) - In-Memory persistent DB. Really easy to use and maintain

