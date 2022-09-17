//userStore - это глабальное хранилище состоянний всех переменных, что относятся к нашим товарам
//Здесь мы будем хранить информацию о наших типах товаров и брендах
//Можно было бы их декомпозировать, и сделать отдельное хранилище для типов и отдельное для брендов, но так как их у нас не так много, будем хранить все в месте
//Логика работы DeviceStore идентична с UserStore

import { makeAutoObservable } from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: "Home Electronics"},
            {id: 2, name: "Smartphomes"}
        ]
        this._brands = [
            {id: 1, name: "Samsung"},
            {id: 2, name: "Apple"}
        ]
        this._devices = [
            {id: 1, name: "iPhone 14", price: 800, raiting: 5, img: "https://www.apple.com/newsroom/images/product/iphone/geo/Apple_iphone13_hero_geo_09142021_inline.jpg.large.jpg"},
            {id: 2, name: "iPhone 14 Max", price: 900, raiting: 5, img: "https://www.apple.com/newsroom/images/product/iphone/geo/Apple_iphone13_hero_geo_09142021_inline.jpg.large.jpg"},
            {id: 3, name: "iPhone 14 Pro", price: 1000, raiting: 5, img: "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/i/p/iphone-14-pro-storage-select-202209-6-7inch-deeppurple.jpg/w_600"},
            {id: 3, name: "iPhone 14 Pro Max", price: 1000, raiting: 5, img: "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/i/p/iphone-14-pro-storage-select-202209-6-7inch-deeppurple.jpg/w_600"}
        ]
        makeAutoObservable(this) 
    }
    
    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }
    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }

}