import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 

  constructor(public authService: AuthService, public usersService: UsersService, public router: Router ) { }

  ngOnInit(): void {
  }


  onSignin(data){
    this.authService.login({ "username": data.username, "password": data.password }).subscribe(
      (response: any) => {
  
        if (response.access_token) {
          this.usersService.token = response.access_token;
          this.usersService.signIn(data.username).subscribe(
            (response: any) => {
                this.usersService.userdata=response;
                localStorage.setItem('currentUser', JSON.stringify(response));
                alert("Successfully Logged in");
            }
          )
          this.router.navigate(['/pages/dashboard']);
          this.usersService.isLoggedIn = true;

        }
      }
    );

    }


}
