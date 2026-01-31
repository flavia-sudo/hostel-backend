import { Request, Response } from "express";
import { createReviewService, getReviewByIdService, getReviewsService, getReviewByHostelIdService, deleteReviewService, updateReviewService} from "./review.service";

export const createReviewController = async(req: Request, res: Response) => {
    try {
        const review = req.body;
        if (review.createdAt) {
            review.createdAt = new Date(review.createdAt);
        }
        if (review.updatedAt) {
            review.updatedAt = new Date(review.updatedAt);
        }
        const newReview = await createReviewService(review);
        if (newReview) {
            res.status(201).json({
                message: "Review created successfully",
                data: newReview
            });
        } else {
            res.status(400).json({
                message: "Failed to create review"
            });
        }
    } catch (error: any){
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}