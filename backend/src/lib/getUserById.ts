import db from "../config/db"

export const getUserById = async(id : string) =>  {
    try {
        const user = await db.user.findUnique({where :{
            id : id
        }});
        if(!user)
        {
            return null;
        }
        return user;
    } catch (error) {
        return null;
    }

}