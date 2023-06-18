import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/core/services/orders.service';
import { UserLoginsService } from 'src/core/services/user-logins.service';
import { UsersService } from 'src/core/services/users.service';

@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.css'],
})
export class InfoCardsComponent implements OnInit {
  date: Date = new Date();
  currentDate = this.date.toLocaleDateString('en-US');
  users_logins: any[] = [];
  orders: any[] = this.ordersService.orders$.value;
  totalOrdersPrice: number = 0;
  users: any[] = this.usersService.users$.value;
  userImgs: any[] = [];
  constructor(
    private userLoginsService: UserLoginsService,
    private usersService: UsersService,
    private ordersService: OrdersService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getUsersLogins();
    this.getOrders();
    this.getUsers();
  }
  getUsersLogins(): void {
    this.userLoginsService.getUsersLogins().subscribe({
      next: (res) => {
        this.users_logins = this.userLoginsService.user_logins$.value;
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
  getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (res) => {
        this.users = this.usersService.users$.value;
        this.getUserImages();
      },
      error: (err) => {
        console.log('error', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  getOrders(): void {
    this.ordersService.getAll().subscribe({
      next: (res) => {
        this.orders = this.ordersService.orders$.value;
        this.getTotalPriceByOrders();
      },
      error: (err) => {
        console.log('err while retrieve orders', err);
      },
      complete: () => {},
    });
  }
  getTotalPriceByOrders(): void {
    const totalPriceByOrder = this.orders.map((order) => {
      const totalPrice = order.products.reduce(
        (sum, product) => +sum + +product.price,
        0
      );
      return { orderId: order.id, totalPrice };
    });
    totalPriceByOrder.forEach((order) => {
      this.totalOrdersPrice += order.totalPrice;
    });
  }
  getUserImages(): void {
    this.userImgs = this.users
      .map((user) => {
        return user.user_img;
      })
      .slice(0, 3);
  }
  downloadPdf() {
    const url = 'http://localhost:3000/api/orders/download';
    this.http.get(url, { responseType: 'blob' }).subscribe((response: any) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'orders.pdf';
      link.click();
    });
  }
  printPdf() {
    const url = 'http://localhost:3000/api/user-logins/download';
    this.http.get(url, { responseType: 'blob' }).subscribe((response: any) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(blob);
      const printWindow = window.open(fileURL);

      // Wait for the print window to finish loading
      printWindow.onload = () => {
        // Call the print method of the print window
        printWindow.print();

        // Clean up the temporary URL object
        URL.revokeObjectURL(fileURL);
      };
    });
  }
}
