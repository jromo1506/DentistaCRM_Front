import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  menuActive: boolean = false;

  constructor(private router:Router) {
    
  }

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }

  ngOnInit() {
    $(document).ready(() => {
      console.log("jQuery is working!");
    });
  }


  openMobile(){

    $('#navbar-mobile').slideToggle(1000);
  }


  navigate(ruta:string){
    this.router.navigate([ruta]);
  }


}
