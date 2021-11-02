import { UserAddress } from './../Models/user-address';
import { Country } from './../Models/country';
import { AddCartElement } from './../Models/add-cart-element';
import { TotalCart } from './../Models/total-cart';
import { CartElement } from '../Models/cart-element';
import { Product } from './../Models/product';
import { Category } from './../Models/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../Models/order';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _url: string = "http://localhost:3000";

  constructor(private _http: HttpClient) { }

  // * get categories
  // all categories
  public getAllCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(this._url + "/categories");
  }
  //category by name
  public getCategoryByName(name: string): Observable<Category> {
    return this._http.get<Category>(this._url + `/categories/byName/${name}`)
  }

  // * get products
  // all products
  public getAllProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this._url + "/products")
  }
  // one product by product id
  public getProductById(id: number): Observable<Product> {
    return this._http.get<Product>(this._url + `/products/byId/${id}`)
  }
  // all product by category id
  public getProductByCategoryId(id: number): Observable<Product[]> {
    return this._http.get<Product[]>(this._url + `/products/byCategory/${id}`)
  }

  // public auth(){
  //   return this._http.post<any>(this._url + "/auth/login", {"email": "mail@mail.com", "password":"toto"}).subscribe((data)=> console.log(data));
  // }

  // * get/post cart -------------------------
  // get cart
  public getCartElementsByUserId(id: number): Observable<CartElement[]> {
    return this._http.get<CartElement[]>(this._url + `/cart/byUserId/${id}`)
  } 
  // get total cart
  public getTotalCardbyUserId(id: number): Observable<TotalCart> {
    return this._http.get<TotalCart>(this._url + `/cart/priceTotalbyUserId/${id}`)
  }
  // add product to cart
  public addProductToCartByProductId(element: AddCartElement): Observable<string> {
    return this._http.post<string>(this._url + '/cart/add', element)
  }
  // update quantity product in cart
  public updateProductQuantityByBasketDetailsId(element: CartElement): Observable<string> {
    return this._http.post<string>(this._url + '/cart/update', element)
  }
  // delete one product
  public deleteOneProductToCartByBasketDetailsId(element: CartElement): Observable<string> {
    return this._http.post<string>(this._url + '/cart/delete', element)
  }
  // delete all product
  public deleteAllProductsToCartByBasketDetailsId(element: CartElement): Observable<string> {
    return this._http.post<string>(this._url + '/cart/deleteAll', element)
  }

  // * get countries list
  public getAllCountries(): Observable<Country[]> {
    return this._http.get<Country[]>(this._url + '/countries')
  }


  // * get user address informations
  public getUserAddress(id: number): Observable<UserAddress>{
    return this._http.get<UserAddress>(this._url + `/usersAddresses/userId/${id}`)
  }

  // ? post order
  public postOrderByUserId(order: Order): Observable<string>{
    return this._http.post<string>(this._url + `/orders/${order.UserId}`, order )
  }
}
