import { Component, OnInit } from '@angular/core';
import { Order, ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  private orders: Order[] = [];
  private loading = true;

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.api.getOrders().subscribe(
      data => {
        this.orders = data;
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.snackBar.open('Error retrieving data', 'Ok', { duration: 2000 });
        console.error(err);
      }
    );
  }

}
