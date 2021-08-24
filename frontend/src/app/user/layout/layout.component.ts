import { Component, OnInit } from '@angular/core';
import { UserService } from './../../service/user.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [`.content-layout{
    width: 100%;
    height: 90vh;
}

.sidenav{
    width: 15%; 
}
@media (max-width: 765px){

  .sidenav{
    width: 100%; 
}

}
`

  ]
})
export class LayoutComponent implements OnInit {

  constructor(private UserService:UserService) { }
  links:string[] = ['Dashboard', 'Orders', 'Cart', 'Account', 'Notification']
  ngOnInit(): void {
    this.UserService.getUserDetail().subscribe(data =>{
      console.log(this.UserService.getUserDetails,"DATA DETAILS")
     })
  }

}
