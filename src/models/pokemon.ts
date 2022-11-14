export default class Pokemon {
    id: number;
    hp: number;
    cp: number;
    name: string;
    picture: string;
    types: Array<number>;
    created: Date;

    constructor(
        id: number,
        hp: number = 100,
        cp: number = 10,
        name: string = 'name',
        picture: string = 'http://...',
        types: Array<number> = [1],
        created: Date = new Date()
    ) {
        this.id = id;
        this.hp = hp;
        this.cp = cp;
        this.name = name;
        this.picture = picture;
        this.types = types;
        this.created = created;
    }
}
