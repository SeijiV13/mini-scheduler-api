import { CreateAgendaDto } from './dto/create-agenda.dto';
import { Injectable } from "@nestjs/common";
import { Agenda, AgendaDocument } from "./schemas/agenda.schema";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UdpdateAgendaDto } from './dto/update-agenda.dto';
import { validate, ValidationError } from 'class-validator';
import { of, defer } from 'rxjs';


@Injectable()
export class AgendaService {
    
    constructor(@InjectModel(Agenda.name) private agendaModel: Model<AgendaDocument>) {}
   
   
    async createAgenda(createAgendaDto: CreateAgendaDto): Promise<Agenda | ValidationError[]> {
        // validate DTO
        const errors = await validate(createAgendaDto);
        if(errors.length > 0) {
          return of(errors).toPromise();
        }
        const createdAgenda = new this.agendaModel(createAgendaDto);
        return createdAgenda.save();
    }

    async updateAgenda(updateAgendaDto: UdpdateAgendaDto) {
      const errors = await validate(updateAgendaDto);
      if(errors.length > 0) {
        return of(errors).toPromise();
      }  
      return this.agendaModel.updateMany({_id: updateAgendaDto.id}, updateAgendaDto).exec();
    }

    async getAgendaByUser(user) {
    return this.agendaModel.find({ user}).exec();

    }

    async getAgendaByUserAndDate(user: string , date: string) {
      return this.agendaModel.find({user, date}).exec();
    }

    async getAgenda(id: string) {
        return this.agendaModel.findOne({_id: id}).exec();
    
    }


    async findAll(): Promise<Agenda[]> {
        return this.agendaModel.find().exec();
    }
}