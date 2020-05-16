import { User } from "../entities/User";
import { getManager, UpdateResult, DeleteResult } from "typeorm";
import { UserDTO } from "../interfaces";

export class UserRepository {
    listUsers(): Promise<User[]> {
        return getManager().getRepository(User).createQueryBuilder("user")
        .select(["user.id", "user.name", "user.email", "user.password"])
        .getMany();
    }

    getUserById(idUser: string): Promise<User> {
        return getManager().getRepository(User).findOne({
            where : {
                id: idUser,
            }
        });
    }

    getUserByName(name: string): Promise<User> {
        return getManager().getRepository(User).findOne({
            where : {
                name,
            }
        });
    }

    getUserByEmail(email: string): Promise<User> {
        return getManager().getRepository(User).findOne({
            where : {
                email,
            }
        });
    }

    getUserByEmailOrName(email: string, name: string): Promise<User> {
        return getManager().getRepository(User).findOne({
            where : [{
                email,
            },{
                name,
            }],
        });
    }

    createUser(user: UserDTO): Promise<User> {
        return getManager().getRepository(User).save(user);
    }

    updateUser(idUser: string, user: User): Promise<UpdateResult> {
        return getManager().getRepository(User).update({id: idUser}, user);
    }

    deleteUser(idUser: string): Promise<DeleteResult> {
        return getManager().getRepository(User).delete({ id: idUser });
    }
}