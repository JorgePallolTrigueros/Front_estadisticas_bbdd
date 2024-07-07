
import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import Chart from 'chart.js/auto';
import { WordCloudChart } from 'chartjs-chart-wordcloud';
import * as L from 'leaflet';





@Component({
  selector: 'app-estadistica-comic',
  standalone: true,
  imports: [],
  templateUrl: './estadistica-comic.component.html',
  styleUrl: './estadistica-comic.component.css'
})
export class EstadisticaComicComponent implements AfterViewInit {
  constructor(private http: HttpClient) { }

  private map:any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }


  private drawMarker(lat:number, lon:number, texto:string): void {
    var marker = L.marker([lat, lon]).addTo(this.map);
    marker.bindPopup(texto);
  }


  private pintarMapaWords() {

    const url = 'http://localhost:8080/v1/nbDescripcionesComic';

    this.http.get(url).subscribe(
      (response:any) => {
        const dt = response.repeatedWordsCount;
        const labs = [];
        const sizes = [];
        for(let d of dt) {
          if (d.count >= 2) {
            labs.push(d.word);
            sizes.push(d.count * 3);
          }
        }
        const ctx = document.getElementById('mapa-palabras') as HTMLCanvasElement;
        const config = {
          type: 'wordCloud',
          data: {
            // text
            labels: labs,
            datasets: [
              {
                label: 'Mapa de palabras...',
                // size in pixel
                data: sizes,
              },
            ],
          },
          options: {},
        };
    
        new WordCloudChart(ctx, config);

      },
      (error:any) => {
        console.error('Error al obtener los animes:', error);
      }
  );

  }




  private obtenerComicsDeCadaAutor(): void {
    const url = 'http://localhost:8080/v1/nbComicsPorAutor';

  this.http.get(url).subscribe(
    (response:any) => {

      const nombres:any = [];
      const cantidades:any = [];

      Object.entries(response).forEach(([nombre, cantidad]) => {
        nombres.push(nombre);
        cantidades.push(cantidad);
      })

      console.log(nombres);
      console.log(cantidades);

      const ctx = document.getElementById('primera-grafica') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: nombres,
          datasets: [
            {
              label: 'Comics de cada autor',
              data: cantidades,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',   // Rojo claro
                'rgba(54, 162, 235, 0.2)',   // Azul claro
                'rgba(255, 206, 86, 0.2)',   // Amarillo claro
                'rgba(75, 192, 192, 0.2)',   // Verde agua
                'rgba(153, 102, 255, 0.2)',  // Púrpura claro
                'rgba(255, 159, 64, 0.2)',   // Naranja claro
                'rgba(255, 99, 255, 0.2)',   // Rosa claro
                'rgba(54, 162, 100, 0.2)',   // Verde claro
                'rgba(255, 206, 200, 0.2)',  // Melón claro
                'rgba(75, 50, 192, 0.2)'     // Azul oscuro
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',     // Rojo
                'rgba(54, 162, 235, 1)',     // Azul
                'rgba(255, 206, 86, 1)',     // Amarillo
                'rgba(75, 192, 192, 1)',     // Verde agua
                'rgba(153, 102, 255, 1)',    // Púrpura
                'rgba(255, 159, 64, 1)',     // Naranja
                'rgba(255, 99, 255, 1)',     // Rosa
                'rgba(54, 162, 100, 1)',     // Verde
                'rgba(255, 206, 200, 1)',    // Melón
                'rgba(75, 50, 192, 1)'       // Azul oscuro
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1, // Define el tamaño del paso a 1
                callback: (value:any) => {
                  if (Number.isInteger(value)) {
                    return value;
                  }
                }
              },
              grid: {
                display: false // Elimina la cuadrícula del fondo
              }
            },
            x: {
              grid: {
                display: false // Elimina la cuadrícula del fondo
              }
            }
          },
          plugins: {
            legend: {
              display: false // Elimina la leyenda
            }
          }
        }
      });
    },
    (error:any) => {
      console.error('Error al obtener los animes:', error);
    }
  );

}




  ngAfterViewInit() {
    this.obtenerComicsDeCadaAutor();
    this.pintarMapaWords();
  }
  
  
}
