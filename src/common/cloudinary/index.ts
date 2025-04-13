import { cloudinaryConfig as c} from "@/common/utils/env-config";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { AppError } from "../app-error";
import multer from "multer";

cloudinary.config({
    cloud_name: c.cloudName,
    api_key: c.apiKey,
    api_secret: c.secret,
    signature_algorithm: "sha256"
});

type UPLOAD_TYPE = "profile";

const getCloudinaryFolder = (type: UPLOAD_TYPE) => {
    switch (type) {
      case "profile":
        return "profile";
      default:
        return "uploads";
    }
};

const createStorage = (uploadType: UPLOAD_TYPE) => {
    return new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (req, file) => {
            const allowedFormats = ["jpg", "jpeg", "png", "gif", "webp"];
            const fileExtension = file.mimetype.split("/")[1];

            if (!allowedFormats.includes(fileExtension)) {
                throw AppError.badRequest(
                    `Invalid file format. Allowed formats are: ${allowedFormats.join(", ")}`,
                );
            }

            const timestamp = Math.floor(Date.now() / 1000);

            return {
                folder: getCloudinaryFolder(uploadType),
                format: fileExtension,
                public_id: `custom_id_${timestamp}`,
                timestamp,
                resource_type: "image",
            };
        },
    });
};

const uploadLimit = 25 * 1024 * 1024;

export const uploadProfile = multer({
    storage: createStorage("profile"),
    limits: { fieldSize: uploadLimit },
});
