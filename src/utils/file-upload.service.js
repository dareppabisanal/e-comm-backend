import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
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