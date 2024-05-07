const express = require('express');
const { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions } = require('@azure/storage-blob');
const qrcode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const { Readable } = require('stream');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Allowing CORS for local testing
const origins = [
    "http://localhost:3000"
];

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', origins.join(','));
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Azure Blob Storage Configuration
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = process.env.CONTAINER_NAME;

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

app.use(express.json());

app.post('/generate-qr', async (req, res) => {
    const { url } = req.body;

    // Generate QR Code
    console.log('Received URL:', url);
    const qrSvg = await qrcode.toBuffer(url);

    const bufferStream = new Readable();
    bufferStream.push(qrSvg);
    bufferStream.push(null);

    // Generate unique file name for Azure Blob Storage
    const fileName = `qr_codes/${uuidv4()}.png`;

    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);

        await blockBlobClient.uploadStream(bufferStream, 4 * 1024 * 1024, 20, {
            blobHTTPHeaders: {
                blobContentType: 'image/png'
            }
        });

        // Generate SAS token for blob
        const sasToken = generateSasToken(blockBlobClient);

        // Generate the Blob URL with SAS token
        const blobUrlWithSasToken = `${blockBlobClient.url}?${sasToken}`;

        // Send response with the Blob URL containing SAS token
        res.json({ qr_code_url: blobUrlWithSasToken });
    } catch (error) {
        console.error('Error generating QR Code:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to generate SAS token for blob
function generateSasToken(blobClient) {
    const blobSAS = generateBlobSASQueryParameters({
        containerName: blobClient.containerName,
        blobName: blobClient.blobName,
        permissions: BlobSASPermissions.parse("r"), // Read permission
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + 86400) // Token expires in 24 hours
    }, blobClient.credential);

    return blobSAS.toString();
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
