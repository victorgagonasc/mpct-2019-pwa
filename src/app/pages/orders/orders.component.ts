import { Component, OnInit } from '@angular/core';
import { Order, ApiService } from 'src/app/services/api.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  private orders: Order[] = [];
  private loading = false;

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;

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

  openDialog(method: string, order?: Order): void {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      data: { method, order }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (method === 'add') {
        this.addOrder(result.order);
      } else {
        this.updateOrder(result.order);
      }
    });
  }

  addOrder(order: Order): void {
    this.api.saveOrder(order).subscribe(
      res => {
        this.snackBar.open('Pedido adicionado com sucesso', 'Ok', { duration: 2000 });
        this.loadOrders();
      },
      err => {
        this.snackBar.open('Erro ao cadastrar pedido', 'Ok', { duration: 2000 });
        console.error(err);
      }
    );
  }

  updateOrder(order: Order): void {
    this.api.updateOrder(order).subscribe(
      res => {
        this.snackBar.open('Pedido atualizado com sucesso', 'Ok', { duration: 2000 });
        this.loadOrders();
      },
      err => {
        this.snackBar.open('Erro ao atualizar pedido', 'Ok', { duration: 2000 });
        console.error(err);
      }
    );
  }

  deleteOrder(order: Order): void {
    if (confirm(`Deseja deletar o pedido ${order.item}?`)) {
      this.api.deleteOrder(order.id).subscribe(
        res => {
          this.snackBar.open('Pedido deletado com sucesso', 'Ok', { duration: 2000 });
          this.loadOrders();
        },
        err => {
          this.snackBar.open('Erro ao deletar pedido', 'Ok', { duration: 2000 });
          console.error(err);
        }
      );
    }
  }

}
