export class Posts {
    public webTitle: string;
    public webUrl: string;
    public type: string;
    public date: string

    constructor(elemnt: any) { 
        this.webTitle = elemnt.webTitle;
        this.webUrl = elemnt.webUrl;
        this.type = elemnt.type;
        this.date = new Date(elemnt.webPublicationDate).toUTCString();
    }
}
