import { Component, OnInit, Input, HostListener } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-header-three',
  templateUrl: './header-three.component.html',
  styleUrls: ['./header-three.component.scss']
})
export class HeaderThreeComponent implements OnInit {

  // @Input() class: string = 'header-2';
  @Input() class: string ;
  @Input() themeLogo: string = 'assets/images/icon/logo(f).png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false
  
  
  public isLoggedIn : boolean;
  public stick: boolean = false;

  constructor(public usersService : UsersService) { }

  ngOnInit(): void {
    this.isLoggedIn=this.usersService.isLoggedIn;
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number >= 150 && window.innerWidth > 400) { 
      this.stick = true;
    } else {
      this.stick = false;
    }
  }

  onLogout(){
    console.log("In Logout");
    this.isLoggedIn=!this.usersService.signOut();
  }

}
