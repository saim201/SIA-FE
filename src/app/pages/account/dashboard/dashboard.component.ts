import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public openDashboard: boolean = false;

  constructor(public userService: UsersService, public router:Router) { }

  userData: any;

  ngOnInit(): void {
    if(this.userService.isLoggedIn){
      setTimeout(() => {
        this.userData = this.userService.userdata;
        console.log(this.userData);
    }, 1000);
    
    }else{
      //Make a modal saying please Login first
    }
  }
  onLogOut(){
    this.userService.isLoggedIn=false;
    this.router.navigate(['/home/fashion3']);
  }

  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }


}
