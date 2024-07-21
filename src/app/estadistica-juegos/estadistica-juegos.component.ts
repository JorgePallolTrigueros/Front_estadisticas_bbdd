
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import {TreemapController, TreemapElement} from 'chartjs-chart-treemap';
import { WordCloudChart } from 'chartjs-chart-wordcloud';
import { ButtonModule } from 'primeng/button';
import * as L from 'leaflet'

import { Component , AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-estadistica-juegos',
  standalone: true,
  imports: [],
  templateUrl: './estadistica-juegos.component.html',
  styleUrl: './estadistica-juegos.component.css'
})
export class EstadisticaJuegosComponent implements AfterViewInit {

  constructor(private http: HttpClient) {
        // Register Chart.js components
        Chart.register(TreemapController, TreemapElement);
  }


  private obtenerGenerosporJuegos(): void {
    const url = 'http://localhost:8080/v1/nbJuegosPorGenero';

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

  private pintarMapaWords() {

    const url = 'http://localhost:8080/v1/nbDescripcionesJuego';

    this.http.get(url).subscribe(
      (response:any) => {
        const dt = response.repeatedWordsCount;
        const labs = [];
        const sizes = [];
        for(let d of dt) {
          labs.push(d.word);
          sizes.push(d.count);
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
          options: {
            
          },
        };
    
        new WordCloudChart(ctx, config);

      },
      (error:any) => {
        console.error('Error al obtener los manga:', error);
      }
  );




  }


  ngAfterViewInit() {
    this.pintarMapaWords();
    this.obtenerGenerosporJuegos();
  }

}
