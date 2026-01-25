import db from "../Drizzle/db";
import { MaintenanceTable, TIMaintenance } from "../Drizzle/schema";
import { eq } from "drizzle-orm";

export const createMaintenanceService = async (maintenance: TIMaintenance) => {
    const [ inserted ] = await db.insert(MaintenanceTable).values(maintenance).returning();
    if (inserted) {
        return inserted;
    }
    return null;
}

export const getMaintenanceService = async () => {
    const maintenanceAll = await db.query.MaintenanceTable.findMany();
    return maintenanceAll;
}

export const getMaintenanceByIdService = async (Id: number) => {
    const maintenance = await db.query.MaintenanceTable.findFirst({
        where: eq(MaintenanceTable.maintenanceId, Id)
    });
    return maintenance;
}

export const updateMaintenanceService = async (Id: number, maintenance: TIMaintenance) => {
    const updated = await db.update(MaintenanceTable).set(maintenance).where(eq(MaintenanceTable.maintenanceId, Id)).returning();
    return updated;
}

export const deleteMaintenanceService = async (Id: number) => {
    const deleted = await db.delete(MaintenanceTable).where(eq(MaintenanceTable.maintenanceId, Id)).returning();
    return deleted;
}

export const getMaintenanceByRoomIdService = async (roomId: number) => {
    const maintenance = await db.query.MaintenanceTable.findFirst({
        where: eq(MaintenanceTable.roomId, roomId)
    });
    return maintenance;
}