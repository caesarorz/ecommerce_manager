export class Product {
    id: number;
    title: string;
    brand: string;
    description: string;
    image: string;
    price: number;

    constructor(id=0,title="",brand="",description="",image="",price=0.0) {
        this.id = id;
        this.title = title;
        this.brand = brand;
        this.description = description;
        this.image = image;
        this.price = price;
    }
}