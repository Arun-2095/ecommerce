import { Observable } from 'rxjs';
import { Product } from './../interface/dashboard';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from './../dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public orderPlaced:boolean = false;

  public orderList: Product[];
 
  public newAddress: boolean = false;

  public addressList = []

  public selectedAddress:number;


  public orderDate:any = "";

  public orderAddress($event){
    this.selectedAddress = $event.value;
  }

  public step: number = 0;

  constructor(private Location: Location, private Form: FormBuilder, private DashboardService: DashboardService,
     private toastrService:ToastrService) { 
     this.DashboardService.addressList.subscribe((address)=>{
       this.addressList = address
     })

  }


  public addressForm = this.Form.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    address: ['', [Validators.required, Validators.minLength(4)]],
    street: ['', [Validators.required, Validators.minLength(4)]],
    taluk: ['', [Validators.required, Validators.minLength(4)]],
    city: ['', [Validators.required, Validators.minLength(4)]],
    landMark: ['', [Validators.required, Validators.minLength(4)]]
  })

  public dateChange(Event){
    this.orderDate = Event.value;
  }

  
  public async addAddress() {
    if (this.addressForm.valid) {
      this.DashboardService.addAddress({ address: this.addressForm.value }).subscribe(
        (response) => {
          this.toastrService.success("Address added Success");
          this.DashboardService.getAddress().subscribe();
        }
      )
    }
  }

  ngOnInit(): void {
    if (history.state.product) {
      this.orderList = history.state.product;
      console.log(this.orderList, "ORDER LISE")
    } else {
      this.Location.back()
    }

    this.DashboardService.getAddress().subscribe()
  }

  setStep(index: number) {
    console.log(this.newAddress, "newAddress")
    this.step = index;
  }

  validateAddress(){
    console.log(this.selectedAddress, "selectedAddress")
     if(this.selectedAddress == undefined ){
       this.toastrService.error("Please select Any Address")
     }else{
        this.nextStep()
      }
  }
  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  public tableColumns = [
    'Product',
    'Quantity',
    'Price',
    'Selected Product',
    'Total',
  ];
  getTotalCost() {
    return this.orderList?.map(t => Number(t.price)).reduce((acc, value) => acc + value, 0);
  }
  
  public placeOrder(){
     
      
   console.log(this.orderDate, !!this.orderDate, "this.orderDate")
      if(!!!this.orderDate){
         this.toastrService.error('please select the order Date')
      }else {
        let requestObj ={
        products : this.orderList,
        selectedAddress: this.selectedAddress,
        orderDate:  this.orderDate.toISOString().slice(0, 19).replace('T', ' '),
        cart_id: history.state.cart_id
      }
       
      this.DashboardService.placeOrder(requestObj).subscribe((order:any)=>{
   
         if(history.state.cart_id){
           this.DashboardService.getCartItems().subscribe()
         }

         if(order.status == true){   
          this.orderPlaced = true;
         }
      
     })
      }
     
    console.log(this.orderList, this.selectedAddress, this.orderDate , "TESTT")
  }

}
