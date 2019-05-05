import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Order {
  id?: string;
  item: string;
  price: number;
  timeToGetReady: number;
  date?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(environment.apiUrl);
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(environment.apiUrl + '/' + id);
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(environment.apiUrl, order);
  }

  updateOrder(order: Order): Observable<Order> {
    const id = order.id;
    delete order.id;

    return this.http.put<Order>(environment.apiUrl + '/' + id, order);
  }

  deleteOrder(id: string): Observable<Order> {
    return this.http.delete<Order>(environment.apiUrl + '/' + id);
  }
}
