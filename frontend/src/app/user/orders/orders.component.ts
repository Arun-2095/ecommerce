import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private Service: DashboardService) { }
 
  public orders= [];
  ngOnInit(): void {

    this.Service.getOrderList().subscribe((list:any)=> this.orders =list.order)
  }

}
