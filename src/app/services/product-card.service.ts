import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';       
import { Observable } from 'rxjs';                             
import { Dessert } from '../model/dessert';      



@Injectable({
  providedIn: 'root' 
})

export class ProductCardService {
  private dataUrl = 'data.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Dessert[]> {
    return this.http.get<Dessert[]>(this.dataUrl); 
  }
}