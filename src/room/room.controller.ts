import { Request, Response } from "express";
import { createRoomService, getRoomsService, getRoomByIdService, getRoomByHostelIdService, deleteRoomService, updateRoomService } from "./room.service";

export const createRoomController = async(req: Request, res: Response) => {
    try {
        const room = req.body;
        const newRoom = await createRoomService(room);
        if (newRoom) {
            res.status(201).json({
                message: "Room created successfully",
                data: newRoom
            });
        } else {
            res.status(400).json({
                message: "Failed to create room"
            });
        }
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}

export const getRoomsController = async (req: Request, res: Response) => {
    try {
        const rooms = await getRoomsService();
        res.status(200).json(rooms);
    } catch (error: any) {
        return res.status(500).json({error: error.message})
    }
}

export const getRoomByIdController = async (req: Request, res: Response) => {
    try {
        const roomId = parseInt(req.params.roomId as string);
        if (isNaN(roomId)) {
            return res.status(400).json({error: "Invalid room ID"});
        }
        const room = await getRoomByIdService(roomId);
        if (room) {
            res.status(200).json(room);
        } else {
            res.status(404).json({error: "Room not found"});
        }
    } catch (error: any) {
        return res.status(500).json({error: error.message})
    }
}

export const updateRoomController = async (req: Request, res: Response) => {
    try {
        const roomId = parseInt(req.params.roomId as string);
        if (isNaN(roomId)) {
            return res.status(400).json({error: "Invalid room ID"});
        }
        const room = req.body;
        await updateRoomService(roomId, room);
        res.status(200).json({
            message: "Room updated successfully",
        });
    } catch (error: any) {
        return res.status(500).json({error: error.message})
    }
}

export const deleteRoomController = async (req: Request, res: Response) => {
    try {
        const roomId = parseInt(req.params.roomId as string);
        if (isNaN(roomId)) {
            return res.status(400).json({error: "Invalid room ID"});
        }
        const existingRoom = await getRoomByIdService(roomId);
        if (!existingRoom) {
            return res.status(404).json({error: "Room not found"});
        }
        await deleteRoomService(roomId);
        return res.status(204).json({error: "Hostel deleted successfully"});
    } catch (error: any) {
        return res.status(500).json({error: error.message})
    }
}

export const getRoomByHostelIdController = async (req: Request, res: Response) => {
    try {
        const hostelId = parseInt(req.params.hostelId as string);
        if (isNaN(hostelId)) {
            return res.status(400).json({error: "Invalid hostel id"});
        }
        const rooms = await getRoomByHostelIdService(hostelId);
        res.status(200).json(rooms);
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}