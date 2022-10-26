import { Server } from "./server";

export class SystemUser{
    id!:number;
    libelle!:string;
    login!:string;
    password!:string;
    enabled!:boolean;
    servers!: Server[] ;
}