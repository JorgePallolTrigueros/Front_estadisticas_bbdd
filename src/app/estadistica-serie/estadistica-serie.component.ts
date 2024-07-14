

import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import Chart from 'chart.js/auto';
import { WordCloudChart } from 'chartjs-chart-wordcloud';
import * as L from 'leaflet';


@Component({
  selector: 'app-estadistica-serie',
  standalone: true,
  imports: [],
  templateUrl: './estadistica-serie.component.html',
  styleUrl: './estadistica-serie.component.css'
})
export class EstadisticaSerieComponent implements AfterViewInit {
  constructor(private http: HttpClient) { }





  private pintarMapaWords() {

    const url = 'http://localhost:8080/v1/nbDescripcionesSerie';

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
        console.error('Error al obtener los juegos emulador:', error);
      }
  );

  }


  ngAfterViewInit() {
    this.pintarMapaWords();
  }


}


