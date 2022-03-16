import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: String = "";
  pass: String ="";

  constructor(public authService: AuthService, public usersService: UsersService ) { }

  ngOnInit(): void {
  }


  onSignin(data){
    this.authService.login({ "username": data.username, "password": data.password }).subscribe(
      (response: any) => {
  
        if (response.access_token) {
          this.usersService.token = response.access_token;
          this.usersService.signIn(data.username).subscribe(
            (response: any) => {
                localStorage.setItem('currentUser', JSON.stringify(response));
            }
          )
          localStorage.setItem('isLoggedin', 'true');
        }
      }
    );

    }


}
