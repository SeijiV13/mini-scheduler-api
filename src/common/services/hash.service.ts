import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashService {

    async hashPassword(password: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds); 
    }

    async comparePassword(password: string, hash) {
        console.log(await bcrypt.compare(password, hash));
        return await bcrypt.compare(password, hash);
    }
}
