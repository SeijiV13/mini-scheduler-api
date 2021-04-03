import { ValidationError } from 'class-validator';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { AgendaService } from './agenda.service';
import { Controller, Get, Post, Body, Put, Query, Param, UseGuards } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { Agenda } from "./schemas/agenda.schema";
import { UdpdateAgendaDto } from './dto/update-agenda.dto';
import { AuthGuard } from '@nestjs/passport';



@Controller('agenda')
export class AgendaController {
    constructor(private agendaService: AgendaService) {}

     
     @UseGuards(AuthGuard('jwt'))
     @Get()
     getAgendaByUser(@Query() query) {
         if(query.user) {
            return this.agendaService.getAgendaByUser(query.user);
         }
         return this.agendaService.findAll();
     }

     @UseGuards(AuthGuard('jwt'))
     @Get(':id')
     getAgenda(@Param() param) {
         return this.agendaService.getAgenda(param.id);
     }

     @UseGuards(AuthGuard('jwt'))
     @Post()
     createAgenda(@Body() createAgendaDto: CreateAgendaDto): Promise<Agenda | ValidationError[]>{
         return this.agendaService.createAgenda(createAgendaDto);
     }

     @UseGuards(AuthGuard('jwt'))
     @Put()
     updateAgenda(@Body() updateAgendaDto: UdpdateAgendaDto) {
        return this.agendaService.updateAgenda(updateAgendaDto);
     }
 }