import { CheckList } from "../schemas/checklist.schema";
import { IsNotEmpty, IsDate, MaxLength } from "class-validator";
import { IsOnlyDate } from "src/common/decorators/date-decorator";

export class CreateAgendaDto {
    @IsNotEmpty()
    user: string;
    @IsNotEmpty()
    @IsOnlyDate()
    date:string;
    @IsNotEmpty()
    @MaxLength(500)
    title: string;
    @MaxLength(1000)
    description: string;
    highPriority: boolean;
    done: boolean;
    checkList: CheckList[];


}