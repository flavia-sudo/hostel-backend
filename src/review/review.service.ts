import db from "../Drizzle/db";
import { ReviewTable, TIReview } from "../Drizzle/schema";
import { eq } from "drizzle-orm";

export const createReviewService = async (review: TIReview) => {
    const [ inserted ] = await db.insert(ReviewTable).values(review).returning();
    if (inserted) {
        return inserted;
    }
    return null;
}

export const getReviewsService = async () => {
    const reviews = await db.query.ReviewTable.findMany();
    return reviews;
}

export const  getReviewByIdService = async (Id: number) => {
    const review = await db.query.ReviewTable.findFirst({
        where: eq(ReviewTable.reviewId, Id)
    });
    return review;
}

export const updateReviewService = async (Id: number, review: TIReview) => {
    const updated = await db.update(ReviewTable).set(review).where(eq(ReviewTable.reviewId, Id)).returning();
    return updated;
}

export const deleteReviewService = async (Id: number) => {
    const deleted = await db.delete(ReviewTable).where(eq(ReviewTable.reviewId, Id)).returning();
    return deleted;
}

export const getReviewByHostelIdService =async (hostelId: number) => {
    const review = await db.query.ReviewTable.findFirst({
        where: eq(ReviewTable.hostelId, hostelId)
    });
    return review;
}