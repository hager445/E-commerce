import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Iproduct } from '../../../shared/interfaces/producs/iproduct';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
    filteredBrand:WritableSignal<Iproduct[]>= signal([]);

  constructor(private http:HttpClient) { }
  getAllBrands():Observable<any>{
    return this.http.get(`${environment.baseUrl}/api/v1/brands`);
  }
  getSpecificBrand(id:string):Observable<any>{
    return this.http.get(`${environment.baseUrl}/api/v1/brands/${id}`);
  }
}
