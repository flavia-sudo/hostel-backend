import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { TIUser, UserTable } from "../Drizzle/schema";

export const createUserService = async (user: TIUser) => {
    const [ inserted ] = await db.insert(UserTable).values(user).returning();
    if (inserted) {
        return inserted;
    }
    return null;
}

export const getUsersService = async () => {
    const users = await db.query.UserTable.findMany();
    return users;
}

export const getUserByIdService =  async (Id: number) => {
    const user = await db.query.UserTable.findFirst({
        where: eq(UserTable.userId, Id)
    });
    return user;
}

export const updateUserService = async (Id: number, user: TIUser) => {
    const updated = await db.update(UserTable).set(user).where(eq(UserTable.userId, Id));
    return updated;
}

export const deleteUserService = async (Id: number) => {
    const deleted = await db.delete(UserTable).where(eq(UserTable.userId, Id));
    return deleted;
}

// get user with landlord role
export const getLandlordService = async () => {
    const landlord =  await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.role, "landlord"));
    return landlord;
};