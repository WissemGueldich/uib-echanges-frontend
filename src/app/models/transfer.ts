import { Configuration } from "./configuration";

export class Transfer{
    id!:number;
    type!:number;
    configuration!:Configuration;
    result!:boolean;
    error!:string;
	date!:Date;
}


