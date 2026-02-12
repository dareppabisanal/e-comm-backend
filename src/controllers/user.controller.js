import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js";
import { User } from "../models/user.model.js";
import { fileUploadService } from "../utils/file-upload.service.js";

const userRegister = asyncHandler(async (req, res) => {
    const { fullName, username, email, password } = req.body;

    if (fullName === "") {
        throw new ApiError(400, "Fullname is required");
    }

    if (username === "") {
        throw new ApiError(400, "Username is required");
    }

    if (email === "") {
        throw new ApiError(400, "Email is required");
    }

    if (password === "") {
        throw new ApiError(400, "Password is required");
    }

    const userExists = await User.findOne({
        $or: [
            { email },
            { username }
        ]
    })

    if (userExists) {
        throw new ApiError(400, "User already exists");
    }

    console.log(req.files)

    const avtarFilePath = req.files?.avatar[0]?.path
    const coverFilePath = req.files?.coverImage[0]?.path

    if (!avtarFilePath) {
        throw new ApiError(400, "Avtar image is required");
    }

    const coverUploaded = await fileUploadService(avtarFilePath);
    if (!coverUploaded) {
        throw new ApiError(500, "Failed to upload avtar image");
    }

    if (!coverFilePath) {
        throw new ApiError(400, "Cover image is required");
    }

    const coverImageUploaded = await fileUploadService(coverFilePath);
    if (!coverImageUploaded) {
        throw new ApiError(500, "Failed to upload cover image");
    }

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avtar: coverUploaded.url,
        coverImage: coverImageUploaded?.url || ""
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -watchHistory"
    );

    if (!createdUser) {
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

export { userRegister }