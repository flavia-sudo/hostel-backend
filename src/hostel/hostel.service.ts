import db from "../Drizzle/db";
import { HostelTable, TIHostel } from "../Drizzle/schema";
import { eq } from "drizzle-orm";

export const createHostelService = async (hostel: TIHostel) => {
    const [ inserted ] = await db.insert(HostelTable).values(hostel).returning();
    if (inserted) {
        return inserted;
    }
    return null;
}

export const getHostelsService = async () => {
    const hostels = await db.query.HostelTable.findMany();
    return hostels;
}

export const getHostelByIdService = async (Id: number) => {
    const hostel = await db.query.HostelTable.findFirst({
        where: eq(HostelTable.hostelId, Id)
    });
    return hostel;
}

export const updateHostelService = async (Id: number, hostel: TIHostel) => {
    const updated = await db.update(HostelTable).set(hostel).where(eq(HostelTable.hostelId, Id)).returning();
    return updated;
}

export const deleteHostelService = async (Id: number) => {
    const deleted = await db.delete(HostelTable).where(eq(HostelTable.hostelId, Id)).returning();
    return deleted;
}


export const getHostelByUserIdService = async (userId: number) => {
    const hostels = await db.query.HostelTable.findFirst({
        where: eq(HostelTable.userId, userId)
    });
    return hostels;
}