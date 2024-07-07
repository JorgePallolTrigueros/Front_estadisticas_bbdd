import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordCloudChart } from 'chartjs-chart-wordcloud';

@Component({
  selector: 'app-estadistica-libros',
  standalone: true,
  imports: [],
  templateUrl: './estadistica-libros.component.html',
  styleUrl: './estadistica-libros.component.css'
})
export class EstadisticaLibrosComponent implements AfterViewInit {

  constructor(private http: HttpClient) { }

  private pintarMapaWords() {

      const url = 'http://localhost:8080/v1/nbDescripcionesLibro';

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
          console.error('Error al obtener los animes:', error);
        }
    );

  }
  
  ngAfterViewInit() {
    this.pintarMapaWords();
  }

}
