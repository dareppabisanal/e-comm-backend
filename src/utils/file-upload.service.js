import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: 'dedxptzdo',
    api_key: '243685385556748',
    api_secret: '9bIXaKNdwaM2RKDjQN7_tfDU-Pk'
});

const fileUploadService = async (filePath) => {
    try {
        if(!filePath) return null;
        const response = await cloudinary.uploader.upload(filePath, { folder: 'e-commerce', resource_type: 'auto' });
        return response;
    } catch (error) {
        fs.unlinkSync(filePath);
        console.error('Error uploading file to Cloudinary:', error);
        return null;
    }
}

export { fileUploadService }