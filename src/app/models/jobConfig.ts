import { Job } from "./job";

export class JobConfigs{
    job!:Job;
    configurations!:number[];
    configurationsMap!:Map<String, string>;
}