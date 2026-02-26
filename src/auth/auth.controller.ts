import { Request, Response } from "express";
import { createAdminService, createUserService, createLandlordService, userLoginService, verifyCodeService } from "./auth.service";

export const registerUserController = async (req: Request, res: Response) => {
    try {
        const {user, token} = await createUserService(req.body);
        return res.status(201).json({
            message: "User created successfully",
            user,
            token
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({message: "Registration failed.Please try again."});
    }
}

export const createAdminController = async (req: Request, res: Response) => {
    try {
        const adminData = req.body;
        if (!adminData.firstName || !adminData.lastName || !adminData.email || !adminData.password) {
            return res.status(400).json({error: "Missing required admin fields" });
        }
        const { admin, token } = await createAdminService(adminData);
        return res.status(201).json({
            message: "Admin created successfully",
            admin: {
                userId: admin.userId,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email
            },
            token
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: "Registration failed.Please try again." });
    }
}

export const createLandlordController = async (req: Request, res: Response) => {
    try {
        const landlordData = req.body;
        if (!landlordData.firstName || !landlordData.lastName || !landlordData.email || !landlordData.password) {
            return res.status(400).json({error: "Missing required landlord fields" });
        }
        const { landlord, token } = await createLandlordService(landlordData);
        return res.status(201).json({
            message: "Landlord created successfully",
            landlord: {
                userId: landlord.userId,
                firstName: landlord.firstName,
                lastName: landlord.lastName,
                email: landlord.email
            },
            token
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: "Registration failed.Please try again." });
    }
}

export const loginUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password"});
    }
    try {
        const {user, token}: any = await userLoginService(email, password);
        return res.status(200).json({
            message: "Login successful",
            user: user,
            token: token
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
}

export const verifyCodeController = async (req: Request, res: Response) => {
    try {
        const { email, code } = req.body;
        const { user, token } = await verifyCodeService(email, code);
        console.log(user, token)

        return res.status(200).json({
            message: "Email verified successfully",
            user,
            token,
        });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};