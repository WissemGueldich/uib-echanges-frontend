import { Configuration } from "./configuration";
import { User } from "./user";

export class Job{
    id!:number;
    libelle!:string;
    startHour!:string;
    endHour!:string;
    frequency!:number;
    state!:boolean;
    days!: any[] ;
    configurations!:Configuration[];
    mailRecipients!:User[];

}