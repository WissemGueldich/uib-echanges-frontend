import { Server } from "./server"
import { SystemUser } from "./systemUser";

export class Configuration{
    id!:number;
    filter!:string;
    overwrite!:boolean;
    libelle!:string;
    move!:boolean;
    archive!:boolean;
    sourcePath!:string;
    sourceArchivingPath!:string;
    destinationPath!:string;
    destinationArchivingPath!:string;
    destinationServer!:Server;
    sourceServer!:Server;
    sourceUser!:SystemUser;
    destinationUser!:SystemUser;
    message!:String;
    error!:boolean;
    disable!:boolean;
    show!:boolean;


}