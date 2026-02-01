import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { PaymentTable, TIPayment } from "../Drizzle/schema";

export const createPaymentService = async (payment: TIPayment) => {
    const [ inserted ] = await db.insert(PaymentTable).values(payment).returning();
    if (inserted) {
        return inserted;
    }
    return null;
}

export const getPaymentService = async () => {
    const payments = await db.query.PaymentTable.findMany();
    return payments;
}

export const getPaymentByIdService = async (Id: number) => {
    const payment = await db.query.PaymentTable.findFirst({
        where: eq(PaymentTable.paymentId, Id)
    });
    return payment;
}

export const updatePaymentService = async (Id: number, payment: TIPayment) => {
    const updated = await db.update(PaymentTable).set(payment).where(eq(PaymentTable.paymentId, Id)).returning();
    return updated;
}

export const deletePaymentService = async (Id: number) => {
    const deleted = await db.delete(PaymentTable).where(eq(PaymentTable.paymentId, Id)).returning();
    return deleted;
}

export const getPaymentByBookingIdService = async (bookingId: number) => {
    const payment = await db.query.PaymentTable.findFirst({
        where: eq(PaymentTable.bookingId, bookingId)
    });
    return payment;
}