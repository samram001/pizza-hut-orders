import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderlistService } from '../orderlist.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router, private orderService:OrderlistService) { }
  
  selectedOrder:object={};
  ngOnInit(): void {
    /**
     *  Get  order id from query params usinf route.
     */
    this.route.queryParams.subscribe(params => {
      /**
       *  Returns specific order data 
       */
      this.orderService.getSpecificOrder(params.id).then((order)=>{
        this.selectedOrder = order;
      });
    });
  }

}
