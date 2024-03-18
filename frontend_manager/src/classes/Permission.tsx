export class Permission {
    id: number;
    name: string;

    constructor(id = 0, name: string) {
        this.id=id;
        this.name=name;
    }
}