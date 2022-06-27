// You code
//=====================TOY FACTORY======================
class Toy {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getToyInfo(){
        return `The toy name is ${this.name}. It costs by ${this.price} dollars.`;
    }
}
class Teddy extends Toy {
    constructor(name, price, material){  
        super(name, price);
        this.material = material;
    }
    getMaterialInfo(){
        return `The toy ${this.name} was made of ${this.material}.`;
    }
}
class Wooden extends Toy {
    constructor(name, price, material){  
        super(name, price);
        if(Wooden.exists){
            return Wooden.instance;
        }
        Wooden.instance = this;
        Wooden.exists = true;
        this.material = material;

    }
    getMaterialInfo(){
        return `The toy ${this.name} was made of ${this.material}.`;
    }
}
class Plastic extends Toy {
    constructor(name, price, material){  
        super(name, price);
        this.material = material;
    }
    getMaterialInfo(){
       return `The toy ${this.name} was made of ${this.material}.`;
    }
}
class ToyFactory {
    constructor(type) {
        this.material = type;
        this.toys = [];
    }
    produce(name, price, type = 'plastic') {
        let toy = this.getToy(name); 
        if (toy) {
            return toy;
        } 
        switch(type) {
            case 'cotton':
                const cotton = new Teddy(name, price, type);
                this.toys.push(cotton);
                return cotton;
            case 'wooden':
                const wooden = new Wooden (name, price, type);
                this.toys.push(wooden);
                return wooden;
            case 'plastic':
                const plastic = new Plastic(name, price, type);
                this.toys.push(plastic);
                return plastic;
        }
    }
    getToy(name){
        return this.toys.find(toy => toy.name === name);
    }
} 
const factory = new ToyFactory();
const teddy = factory.produce('Teddy', 100, 'cotton');
const horse = factory.produce('Horse', 150, 'wooden');
const tree = factory.produce('Tree', 150, 'wooden');
const car = factory.produce('Baracuda', 200, 'plastic');
const mouse = factory.produce('Mikki', 150);

const fake = factory.produce('Teddy', 1000, 'iron');

console.log(teddy.getToyInfo());
console.log(teddy.getMaterialInfo());
console.log('--------------------------------');
console.log(horse.getToyInfo());
console.log(horse.getMaterialInfo());
console.log('--------------------------------');
console.log(tree.getToyInfo());
console.log(tree.getMaterialInfo());
console.log('--------------------------------');
console.log(car.getToyInfo());
console.log(car.getMaterialInfo());
console.log('--------------------------------');
console.log(mouse.getToyInfo());
console.log(mouse.getMaterialInfo());
console.log('--------------------------------');
console.log(fake.getToyInfo());
console.log(fake.getMaterialInfo());
console.log('--------------------------------');
console.log(horse === tree);

//========================AMBULANCE===========================
class Car {
    constructor(name, host) {
        this.name = name;
        this.host = host;
    }
    carSound() {
        return 'Usual car sound';
    }
}

function AmbulanceCar(car) {
        car.ambulanceSound = function () {
            return 'Siren sound';
        }
        return car;
}
console.log('--------------------------------');
const bmw = new Car ('BMW', 'Doctor');
const ambulanceBMW = AmbulanceCar(bmw);
console.log(ambulanceBMW.ambulanceSound());
console.log('--------------------------------');
const toyota = new Car ('Toyota', 'Doctor2');
const ambulanceToyota = AmbulanceCar(toyota);
console.log(ambulanceToyota.ambulanceSound());
