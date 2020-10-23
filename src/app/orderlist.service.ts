import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OrderlistService {
  constructor(private http: HttpClient) { }
  apiurl: string = "http://localhost:3000/orders";

  /**
   * Returns list of orders from json server 
   */
  getOrderList() {
    return this.http.get(this.apiurl)
      .toPromise()
      .then(res => <OrderList[]>res)
      .then(data => {
        return data;
      });
  }

  /**
   * Returns list of orders from json server 
   * 
   * @param {number} id - Order unique id.
   */
  getSpecificOrder(id) {
    return this.http.get(this.apiurl+ "/" + id)
      .toPromise()
      .then(res => <OrderList[]>res)
      .then(data => {
        return data;
      });
  }

  /**
   * Returns order list headers 
   */
  getOrderListHeaders() {
    let headerInfo = [
      { "display": "Customer Name", "value": "customer_name" },
      { "display": "No of Items", "value": "no_of_items" },
      { "display": "Total Amount", "value": "total_amount" },
      { "display": "Status", "value": "status" },
      { "display": "Action", "value": "Action" }
    ]
    return headerInfo;
  }

  /**
   * Update specific order in json server.
   * 
   * @param {number} id - Order unique id.
   * @param {object} orderObj - Specific order data to update in json server.
   */
  updateOrder(id, orderObj) {
    this.http
      .put(this.apiurl + "/" + id, orderObj)
      .toPromise()
      .then(() => {

      });
  }
}

export interface OrderList {
  customer_name?;
  no_of_items?;
  total_amount?;
  status?;
}
