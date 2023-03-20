import { Configuration } from "./configuration";

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