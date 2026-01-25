import { Express } from "express";
import { createAdminController, loginUserController, registerUserController, verifyCodeController } from "./auth.controller";

const auth = (app: Express) => {
    app.route("/auth/register").post(
        async (req, res, next) => {
            try {
                await registerUserController(req, res);
            } catch (error: any) {
                next(error);
            }
        }
    )

    app.route("/auth/admin/create").post(
        async (req, res, next) => {
            try {
                await createAdminController(req, res);
            } catch (error: any) {
                next (error);
            }
        }
    )

    app.route("/auth/login").post(
        async (req, res, next) => {
            try {
                await loginUserController(req, res);
            } catch (error: any) {
                next(error);
            }
        }
    )

    app.route("/auth/verify").post(
        async (req, res, next) => {
            try {
                await verifyCodeController(req, res);
            } catch (error: any) {
                next(error);
            }
        }
    )
}

export default auth;