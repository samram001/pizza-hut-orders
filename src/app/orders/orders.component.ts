import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderlistService } from '../orderlist.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrderlistService, private router: Router) { }
  orderListHeaders = [];
  orderList = [];
  statusList = ["Order Received", "Preparing", "Ready to Serve"];

  ngOnInit(): void {
    this.orderListHeaders = this.orderService.getOrderListHeaders();
    
    /* Returns list of orders */
    this.orderService.getOrderList().then((data) => {
      this.orderList = data;
    });
  }

  /**
     * Redirect to order detail page.
     *
     * @param {EventOject} event - Click event object.
     * @param {number} id - Order unique id.
     */
  selectedOrder(event, id) {
    if (event.target.innerText != "Change Status") {
      this.router.navigate(['/order-detail'], { queryParams: { id: id } });
    }
  }

   /**
     * Order status update in json server orders json.
     *
     * @param {number} id - Order unique id.
     * @param {string} status - Order current status.
     */
  changeStatus(id, status) {
    let selectedOrder = this.orderList.filter((data) => {
      return data.id == id;
    });
    let statusIndex = this.statusList.indexOf(status);
    if (statusIndex < this.statusList.length - 1) {
      selectedOrder[0].status = this.statusList[statusIndex + 1];
      this.orderService.updateOrder(id, selectedOrder[0]);
    }
  }
}


