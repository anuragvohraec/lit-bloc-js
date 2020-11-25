import { TemplateResult, render } from "lit-html";

interface _ClassTypes{
    name: string
}

export abstract class ReposProvider extends HTMLElement{
    constructor(private repos: any[], private useShadow:boolean=false){
        super();
    }

    connectedCallback(){
        if(this.useShadow){
            this.attachShadow({mode: 'open'});
        }
        this._build();
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
            let t: HTMLElement|null = currentEl.parentElement;
            currentEl = t;
        }
    }

    _build(){
        let gui = this.builder();
        render(gui,this.useShadow?this.shadowRoot!:this);
     }
 
     abstract builder(): TemplateResult;
}