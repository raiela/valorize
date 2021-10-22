import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories"

interface IUserReques{
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService{
    async execute({ name, email, admin } : IUserReques){
        const userRepository = getCustomRepository(UserRepositories);
      
        if(!email){
            throw new Error("Email incorrect");
        }
        
        const userAlreadyExists = await userRepository.findOne({
            email
        });
        
        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const user = userRepository.create({
            name, 
            email, 
            admin
        })

        await userRepository.save(user);
        
        return user;

    }
}

export { CreateUserService }