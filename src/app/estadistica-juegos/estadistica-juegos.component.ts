
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
  }

}
