const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bucketName = process.env.AWS_BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

const uploadFile = (file) => {
    const fileStream = fs.createReadStream(file.tempFilePath);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.name
    }

    return s3.upload(uploadParams).promise()
}

const getFileStream = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }
    return s3.getObject(downloadParams).createReadStream()
}

const getObjectsKey = () => {
    const result = s3.listObjectsV2({ Bucket: bucketName }).promise()
    return result

}

module.exports = { uploadFile, getFileStream, getObjectsKey };
