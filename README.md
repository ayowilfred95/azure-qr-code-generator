# Azure QR Code Generator

This application allows users to generate QR codes for provided URLs. The front-end is built using Next.js, while the API is developed in Node.js with Express.

## Application Overview

**Front-End**: A web application where users can submit URLs to generate QR codes.

**API**: An API that receives URLs and generates QR codes. The generated QR codes are stored in cloud storage, specifically Azure Blob Storage.

## Running Locally

### Setting Up the API (Server)

To run the API server locally:

1. Clone this repository.
2. Navigate to the `server` directory.
3. Run `npm install` to install the required packages.
4. Create a `.env` file to store secret variables `AZURE_STORAGE_CONNECTION_STRING` and `CONTAINER_NAME`

### Setting Up the Front-End

To run the front-end server locally:

1. Clone this repository.
2. Navigate to the `front-end-nextjs` directory.
3. Install the dependencies with `npm install`.
4. Start the Next.js server with `npm run dev`.
5. The front-end server should be accessible at `http://localhost:3000`.

## Project Goal

The main goal of this project is to gain hands-on experience with cloud practices, particularly cloud storage solutions like Azure Blob Storage.


## Author

[Ayomide Wilfred](https://github.com/ayowilfred95)

## License

This project is licensed under the [MIT License](./LICENSE).
