import { Configuration } from "./configuration";
import { Server } from "./server"
import { SystemUser } from "./systemUser";

export class Job{
    id!:number;
    libelle!:string;
    startHour!:string;
    endHour!:string;
    frequency!:number;
    state!:boolean;
    days!: any[] ;
    configurations!:Configuration[];
}