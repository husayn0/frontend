import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { RouterOutlet } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn = false;
  username?: string;
  user:any={}
  viewAside=true;
  constructor(private tokenStorageService: TokenStorageService ) { }

  ngOnInit(): void {}

}
