import { AuthService } from './../auth/auth.service';
import { ValidationError } from 'class-validator';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { AgendaService } from './agenda.service';
import { Controller, Get, Post, Body, Put, Query, Param, UseGuards, Headers, Header, Delete } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { Agenda } from "./schemas/agenda.schema";
import { UdpdateAgendaDto } from './dto/update-agenda.dto';
import { AuthGuard } from '@nestjs/passport';



@Controller('agenda')
export class AgendaController {
    constructor(private agendaService: AgendaService, private authService: AuthService) {}

     
     @UseGuards(AuthGuard('jwt'))
     @Get("/all")
     async getAgendasByUser(@Headers() header) {
         const details : any = await this.authService.extractUser(header);
         return await this.agendaService.getAgendaByUser(details.username);
     }
     
     @UseGuards(AuthGuard('jwt'))
     @Get("/bydate")
     async getAgendasByDateAndUser(@Headers() header, @Query() query){
        const details : any = await this.authService.extractUser(header);
        return await this.agendaService.getAgendaByUserAndDate(details.username, query.date);


     }

     @UseGuards(AuthGuard('jwt'))
     @Get(':id')
     getAgenda(@Param() param) {
         return this.agendaService.getAgenda(param.id);
     }

     @UseGuards(AuthGuard('jwt'))
     @Post()
     createAgenda(@Body() createAgendaDto: CreateAgendaDto): Promise<Agenda | ValidationError[]>{
         let agenda = new CreateAgendaDto();
         Object.assign(agenda, createAgendaDto);
         return this.agendaService.createAgenda(agenda);
     }

     @UseGuards(AuthGuard('jwt'))
     @Put()
     updateAgenda(@Body() updateAgendaDto: UdpdateAgendaDto) {
        let agenda = new UdpdateAgendaDto();
        Object.assign(agenda, updateAgendaDto);
        return this.agendaService.updateAgenda(agenda);
     }

     @UseGuards(AuthGuard('jwt'))
     @Delete(":id")
     deleteAgenda(@Param() param) {
        return this.agendaService.deleteAgenda(param.id);
     }
 }