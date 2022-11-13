//userStore - это глабальное хранилище состоянний всех переменных, что относятся к нашим товарам
//Здесь мы будем хранить информацию о наших типах товаров и брендах
//Можно было бы их декомпозировать, и сделать отдельное хранилище для типов и отдельное для брендов, но так как их у нас не так много, будем хранить все в месте
//Логика работы DeviceStore идентична с UserStore

//После первоначальной настройки Shop.js, теперь также добавим в deviceStore логику setSelectedType/this._selectedType
//Так как при нажатии на какой то конкретный тип товара, нам нужно его визуально выделить (чтобы мы видели на что именно мы нажали)
//И теперь если .id добавленного при нажатии кнопки типа товара === .id изначально существующего типа, то он будет подсвечен отдельным цветом

//После имплементации в Shop.js логики по получению типов, брендов, девайсов с бека, удаляем захардкоженные значения внутри this._types и т.д.

import { makeAutoObservable } from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
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
    setSelectedType(type) {
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
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
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }

}