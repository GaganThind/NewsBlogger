export class ApiKeys {
    id: string;
    value: string;

    constructor(element: any) {
        this.id = element.id;
        this.value = element.value;
    }
}
