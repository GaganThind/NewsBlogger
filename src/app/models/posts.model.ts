/**
 * This model class is used to create news posts from the provided inputs
 */
export class Posts {
    public title: string;
    public url: string;
    public typeOfPostOrSource: string;
    public date: string

    constructor(elemnt: any) { 
        this.title = elemnt.title;
        this.url = elemnt.url;
        this.typeOfPostOrSource = elemnt.typeOfPostOrSource;
        this.date = new Date(elemnt.date).toUTCString();
    }
}
