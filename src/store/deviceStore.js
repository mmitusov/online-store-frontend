//deviceStore - это глабальное хранилище состоянний всех переменных, что относятся к нашим товарам
//Здесь мы будем хранить информацию о наших типах товаров и брендах
//Можно было бы их декомпозировать, и сделать отдельное хранилище для типов и отдельное для брендов, но так как их у нас не так много, будем хранить все в месте
//Логика работы DeviceStore идентична с UserStore

//После первоначальной настройки Shop.js, теперь также добавим в deviceStore логику setSelectedType/this._selectedType
//Так как при нажатии на какой то конкретный тип товара, на стартовой странице магазина, нам нужно его визуально выделить/подстветить (чтобы мы видели на что именно мы нажали)
//И теперь если .id добавленного при нажатии кнопки типа товара === .id изначально существующего типа, то он будет подсвечен отдельным цветом

//После имплементации в Shop.js логики по получению типов, брендов, девайсов с бека, удаляем захардкоженные значения внутри this._types и т.д.

//Ближе к концу разработки, для работы логики по пагинации, также добавим пару новых полей/состояний: this._page, this._totalCount, this._limit
//this._page - отвечает за текущею страницу
//this._totalCount - отвечает за общее количество товаров которые доступны по нашему запросу
//this._limit - это лимит отображения количества товаров на одной странице. В тестовых целях зделаем ее оп умолчанию - 3
//После чего создадим под них сеттеры и геттеры
//После чего перейдем в deviceAPI.js, чтобы дописать логику по фетчингу с бекенда нужной нам информации для работы пагинации

import { makeAutoObservable } from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
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
    setPage(page) {
        this._page = page
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount
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
    get page() {
        return this._page
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
    }

}