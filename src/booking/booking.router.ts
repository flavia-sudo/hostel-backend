import { Express, Response, Request, NextFunction } from 'express';
import { createBookingController, deleteBookingController, getBookingByIdController, getBookingController, getBookingByUserIdController, updateBookingController } from './booking.controller';

const booking = (app: Express) => {
    app.route('/booking').post(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await createBookingController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )

    app.route('/booking_all').get(
        async (req: Request, res: Response, next: NextFunction) =>{
            try {
                await getBookingController(req, res)
            } catch (error) {
                next (error)
            }
        }
    )

    app.route('/booking/:bookingId').get(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await getBookingByIdController(req, res)
            } catch (error) {
                next (error)
            }
        }
    )

    app.route('/booking/:bookingId').put(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await updateBookingController(req, res)
            } catch (error) {
                next (error)
            }
        }
    )

    app.route('/booking/:bookingId').delete(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await deleteBookingController(req, res)
            } catch (error) {
                next (error)
            }
        }
    )

    app.route('/booking/user/:userId').get(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await getBookingByUserIdController(req, res)
            } catch (error) {
                next (error)
            }
        }
    )
}

export default booking