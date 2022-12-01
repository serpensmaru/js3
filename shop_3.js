class Good {
    // Класс оипсывающий объект каталога
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable(available) {
        // изменеине  досутпности товара
        this.available = available;
    }
}


class GoodList {
    // Классд для работы с каталогом
    constructor() {
        this.goods = [];
        this.filter = /cat/g;  // тут должна быть регулярка, ее функционал еще не сделан
        this.sortPrice = true;
        this.sortDir = true;
    }

    get list() {
        // получение каталога, в зависимости от вкл/выкл сортировки (sortPrice) и с указанием направления сортировки (sortDir)
        if (this.sortPrice) {           // в описании дз было сказанно использовать такую конструкцию filter.test(good.name)
            return this.goods            // не понял ее смысл, но сделал проверку на регулярку, результат .search !== -1, значит элемент подходит
            .filter(g => g.name.search(this.filter) !== -1 && g.available)
            .sort((g1, g2) => (this.sortDir ? (g1.price - g2.price) : (g2.price - g1.price)))
        }
        return this.goods
            .filter(g => g.name == this.filter && g.available)
    }

    add(...new_good) {
        // добавление элемента(ов) в каталог
        return this.goods.push(...new_good)
    }
    
    remove(id) {
        // удаление элемента из каталога по id
        let element = this.goods.find(g => g.id == id)
        let ind_element = this.goods.lastIndexOf(element)
        this.goods.splice(ind_element, 1)
    }
}

class BasketGood extends Good {
    // хранение данных о товаре в козине
    constructor(amount, good) {
        super(...Object.values(good));
        this.amount = amount;
    }
}


class Basket {
    // хранеине списка товаров в корзинеы
    constructor() {
        this.goods = []
    }

    add(good, amount) {
        // добавление элемента(ов) в каталог, если товара нет, то добавляет товар
        let ind = this.goods.findIndex(element => element.id === good.id);
        ind !== -1 ? (this.goods[ind].amount += amount) : (this.goods.push(new BasketGood(amount, good)))
        return this.goods

    }

    get totalSum() {
        // общая сумма козины
        return this.goods.reduce(
            (sum, element) => sum + element.price*element.amount, 0
            )
    }

    get totalAmount() {
        // общее количество товаров
        return this.goods.reduce(
            (sum, element) => sum + element.amount, 0
            )
    }

    clear() {
        // очитска корзины
        return this.goods = []
    }
    
    remove(good, amount) {
        // уменьшает количество предмета good в корзине на amount, если меньше или равно 0, то уудалить товар из корзины
        let ind = this.goods.findIndex(element => element.id === good.id);
        if (ind !== -1) {
            (this.goods[ind].amount - amount) <= 0 ? this.goods.splice(ind, 1) : (this.goods[ind].amount -= amount)
        }
    }    
    
    removeUnavailable() {
        // очищает коризну от недоступных товаров 
       return this.goods = this.goods.filter(element => element.available)
    }

}


let a = new Good(1, "vip cat", "cute", "xs", 3, true);
let b = new Good(2, "dog", "cute", "xs", 4, false);
let c = new Good(3, "cat", "cute", "xs", 1, true);
let d = new Good(4, "cat", "qwe", "xs", 2, true);
let e = new Good(5, "qqqqq", "qwe", "m", 2, false);

let catalog = new GoodList()
catalog.add(a, b, c, d)

// catalog.list

let q = new BasketGood(3, a)
let w = new BasketGood(4, b)
let s = new BasketGood(4, c)

let basket = new Basket
basket.goods.push(q, w, s)

basket.add(d, 2)

console.log(basket.totalAmount)
console.log(basket.totalSum)

basket.add(e, 3)
basket.remove(e, 2)
// basket.remove(e, 4)
console.log(basket.removeUnavailable())
console.log(basket.goods)
// basket.clear
console.log(basket.totalAmount)
console.log(basket.totalSum)



