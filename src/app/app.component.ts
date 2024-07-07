import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterLink,
    ButtonModule,
    FormsModule,
    DialogModule,
    HttpClientModule 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{


  public w3_open(): void {
    (document.getElementById("mySidebar") as any).style.display = "block";
    (document.getElementById("myOverlay") as any).style.display = "block";
  }

  public w3_close(): void {
    (document.getElementById("mySidebar") as any).style.display = "none";
    (document.getElementById("myOverlay") as any).style.display = "none";
  }
  /*
  private onClick(element:any): void {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
  }*/

}
