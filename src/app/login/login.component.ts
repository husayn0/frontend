import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [FormsModule]
})

export class LoginComponent {
  constructor(private authService: AuthService,private router: Router, private bar: MatSnackBar,private tokenStorage: TokenStorageService) {
    if(tokenStorage.getToken()){
      authService.checkAuth().subscribe({
        next:(res)=>{
          if(res.message =="ValidToken") {
            this.snack(res.message+ ", Logout first!");
            this.navigateTo('/home');
          }
        }
      })
    }   
    }

  login(username: string, password: string): void {
    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.tokenStorage.saveToken(res.accessToken);
        this.tokenStorage.saveUser(res.user)
        this.navigateTo('/home');
      },
      error: (err) => {
        this.snack("Invalid username or password!");
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  snack(message: string): void {
    this.bar.open(message, 'Close', {
      duration: 3000,
    });
  }
}