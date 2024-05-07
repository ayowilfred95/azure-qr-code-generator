# devops-qr-code

This is the sample application for the DevOps Capstone Project.
It generates QR Codes for the provided URL, the front-end is in NextJS and the API is written in Nodejs using Express.

## Application

**Front-End** - A web application where users can submit URLs.

**API**: API that receives URLs and generates QR codes. The API stores the QR codes in cloud storage(Azure blob storage).

## Running locally
The API code exists in the `server` directory. You can run the API server locally:

### server
I created the nodejs express backend for this application
- Clone this repo
- Make sure you are in the `server` directory
- run npm install to install the required packages

### Front-end

The front-end code exits in the `frontend` directory. You can run the front-end server locally:

- Clone this repo
- Make sure you are in the `front-end-nextjs` directory
- Install the dependencies: `npm install`
- Run the NextJS Server: `npm run dev`
- Your Front-end Server should be running on `http://localhost:3000`


## Goal

The goal is to get hands-on with Cloud practices like Storage.

Look at the capstone project for more detials.

## Author

[Ayomide Wilfred](https://github.com/ayowilfred95)

## License

[MIT](./LICENSE)
