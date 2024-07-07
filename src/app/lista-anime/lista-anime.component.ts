import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { NgIf, NgFor } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

type Anime = {
  id: number;
  nombre: string;
  imagen: string;
  autor: string;
  descripcion: string;
};

@Component({
  selector: 'app-lista-anime',
  standalone: true,
  imports: [
    ButtonModule, 
    NgIf, 
    NgFor, 
    DialogModule
  ],
  templateUrl: './lista-anime.component.html',
  styleUrl: './lista-anime.component.css'
})

export class ListaAnimeComponent implements AfterViewInit {

  constructor(private http: HttpClient) { }

  Animes: Anime[] = [];
  registrosPaginados: Anime[] = [];
  paginaActual: number = 1;
  registrosPorPagina: number = 9; // Ajusta según necesites
  paginasTotales: number = 0;

  arrayPaginas: number[] = [];

  visible:boolean = false;

  private obtenerAnimes(): void {
    const url = 'http://localhost:8080/v1/animes';

    this.http.get(url).subscribe(
      (response:any) => {
        const animesResponse = response.animes;
        this.Animes = animesResponse;
        this.paginarRegistros();

        this.paginasTotales = this.getTotalPaginas();
        this.arrayPaginas = Array(this.paginasTotales).fill(0).map((x, i) => i + 1);

      },
      (error:any) => {
        console.error('Error al obtener los comics:', error);
      }
    );

  }

  ngAfterViewInit() {
    this.obtenerAnimes();
  }

  paginarRegistros() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.registrosPaginados = this.Animes.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    this.paginaActual = nuevaPagina;
    this.paginarRegistros();
  }

  getTotalPaginas() {
    return Math.ceil(this.Animes.length / this.registrosPorPagina);
  }

  verDetalles(id: number) {
    alert("ID" + id);
  }

  showDialog() {
    this.visible = true;
  }


}
