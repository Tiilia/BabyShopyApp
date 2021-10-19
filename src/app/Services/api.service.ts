import { Category } from './../Models/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _url: string = "http://localhost:3000";

  constructor(private _http: HttpClient) { }

  // * get categories
  public getAllCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(this._url + "/categories");
  }
}
