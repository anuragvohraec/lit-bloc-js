import { TemplateResult, render } from "lit-html";

interface _ClassTypes{
    name: string
}

export abstract class ReposProvider extends HTMLElement{
    constructor(private repos: any[]){
        super();
    }

    _findARepo<R, T extends _ClassTypes>(typeOfRepo: T): R|undefined{
        for(let r of this.repos){
            if(r.constructor.name === typeOfRepo.name){
                return r;
            }
        }
    }

    static of<R,T extends _ClassTypes>(repoType: T, startingElement: HTMLElement){
        let currentEl: HTMLElement|null = startingElement;
        while(currentEl){
            if(currentEl instanceof ReposProvider){
                let found_repo = currentEl._findARepo<R,T>(repoType);
                if(found_repo){
                    return found_repo;
                }
            }
            currentEl = currentEl.parentElement;
        }
    }

    _build(){
        let gui = this.builder();
        render(gui,this);
     }
 
     abstract builder(): TemplateResult;
}