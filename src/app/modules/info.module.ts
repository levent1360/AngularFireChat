export class warning{
    disable:Boolean;
    text:String;
    className:string
    constructor(disable:Boolean,text:String, className:string){
        this.disable=disable;
        this.className=className;
        this.text=text;
    }
}