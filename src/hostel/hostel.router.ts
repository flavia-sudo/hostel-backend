import { Express, Response, Request, NextFunction } from 'express';
import { createHostelController, deleteHostelController, getHostelByIdController, getHostelController, getHostelByUserIdController, updateHostelController } from './hostel.controller';

const hostel = (app: Express) => {
    app.route('/hostel').post(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await createHostelController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )

    app.route('/hostel_all').get(
        async (req: Request, res: Response, next: NextFunction) =>{
            try {
                await getHostelController(req, res)
            } catch (error) {
                next (error)
            }
        }
    )

    app.route('/hostel/:hostelId').get(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await getHostelByIdController(req, res)
            } catch (error) {
                next (error)
            }
        }
    )

    app.route('/hostel/:hostelId').put(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await updateHostelController(req, res)
            } catch (error) {
                next (error)
            }
        }
    )

    app.route('/hostel/:hostelId').delete(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await deleteHostelController(req, res)
            } catch (error) {
                next (error)
            }
        }
    )

    app.route('/hostel/user/:userId').get(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await getHostelByUserIdController(req, res)
            } catch (error) {
                next (error)
            }
        }
    )
}

export default hostel