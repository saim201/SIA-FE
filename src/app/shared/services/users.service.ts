import { Injectable } from '@angular/core';
// import { Response } from '@angular/http';
// import { UrlInfo } from './../interfaces/url-info.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenService } from './token.service';

class UserModel{
	fname: string;
	mname: string;
	lname: string;
	city: string;
	country: string;
	username: string;
	phonenumber: string;
	address1: string;
	address2: string;
	dob: string;
	email: string;
	id: Number;
	state:String;
	street:string;
	gender:string;
	
	constructor(fname,mname,lname,city,){

	}
}


@Injectable({
    providedIn: 'root'
  })
export class UsersService {
    
	userdata : any;
    constructor(private http: HttpClient){}
    
    
    USERS_SERIVCE_URL: string= 'http://localhost:8082';
    token : String;
	isLoggedIn : boolean = false;

	signIn(username) {
		console.log("in sign in "  ,this.token);
		let HTTP_OPTIONS = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Bearer ' + this.token
			})
		};

		console.log("this is username : ", username);
		return this.http.get(this.USERS_SERIVCE_URL + "/users/userinfo?username=" + username, HTTP_OPTIONS)
			.map(
				(response: Response) => {
					console.log("new user: ", response);
					
					return response;
				}
				);


	}

	signOut() : boolean{
		if(this.isLoggedIn){
			localStorage.removeItem('currentUser');
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			localStorage.setItem('isLoggedin', "false");
			this.isLoggedIn = false;
			return true;
		}
	}






}