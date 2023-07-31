export class Page<Transfer> {
    content!: Transfer[];
    size!:number;
    totalElements!:number;
    totalPages!:number;
    empty!:boolean;
    first!:boolean;
    last!:boolean;
    number!:number;
    numberOfElements!:number;
  }