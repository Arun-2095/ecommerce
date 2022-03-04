import { Observable } from 'rxjs';
import { Product } from './../interface/dashboard';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common'
import { FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from './../dashboard.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public orderList: Product[];
  public newAddress: boolean = false;

  public step: number = 0;

  constructor(private Location: Location, private Form: FormBuilder, private DashboardService: DashboardService) { }

  public addressForm = this.Form.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    address: ['', [Validators.required, Validators.minLength(4)]],
    street: ['', [Validators.required, Validators.minLength(4)]],
    taluk: ['', [Validators.required, Validators.minLength(4)]],
    city: ['', [Validators.required, Validators.minLength(4)]],
    landMark: ['', [Validators.required, Validators.minLength(4)]]
  })


  public async addAddress() {

    if (this.addressForm.valid) {
      this.DashboardService.addAddress({ address: this.addressForm.value }).subscribe(
        (response) => console.log(response, "RESPONE")
      )
    }


  }
  ngOnInit(): void {
    if (history.state.product) {
      this.orderList = history.state.product;
    } else {
      this.Location.back()
    }

    this.DashboardService.getAddress().subscribe((address) => {
      console.log(address, "ADDRESS")
    })
  }

  setStep(index: number) {
    console.log(this.newAddress, "newAddress")
    this.step = index;
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

}
