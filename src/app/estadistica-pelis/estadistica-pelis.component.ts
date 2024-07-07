import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import Chart from 'chart.js/auto';
import { WordCloudChart } from 'chartjs-chart-wordcloud';
import * as L from 'leaflet';
import * as d3 from 'd3';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { axisTop } from 'd3-axis';
import { easeLinear } from 'd3-ease';
import { group } from 'd3-array';
import { schemeTableau10 } from 'd3-scale-chromatic'

@Component({
  selector: 'app-estadistica-pelis',
  standalone: true,
  imports: [],
  templateUrl: './estadistica-pelis.component.html',
  styleUrl: './estadistica-pelis.component.css'
})
export class EstadisticaPelisComponent {

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

    const url = 'http://localhost:8080/v1/nbGenerosAnime';

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
          options: {},
        };
    
        new WordCloudChart(ctx, config);

      },
      (error:any) => {
        console.error('Error al obtener los animes:', error);
      }
  );

  }


  private pintarBarrasRace() {

    const url = 'http://localhost:8080/v1/nbPelisPorPaisesPorAnio';
  
    this.http.get(url).subscribe(
      (response:any) => {
 

        const svg = d3.select("#cuarta-grafica");
        const width = 800;
        const height = 800;
        const ticker = 400;
    
        const data = {
          "states_daily": response
        };
    
        const totalCovidDataState = data.states_daily;
        const groupedData = processData(totalCovidDataState);
        plotChart(groupedData);
    
        async function plotChart(data:any) {
            const dateList = Array.from(data.keys());
            const fontSize = 16;
            const rectProperties = { height: 20, padding: 10 };
    
            const container = svg.append("g")
                                .classed("container", true)
                                .style("transform", "translateY(25px)");
    
            const widthScale:any = scaleLinear();
    
            const aTop = svg
                            .append('g')
                            .classed('axis', true)
                            .style("transform", "translate(10px, 20px)")
                            //.call(axisTop(widthScale));
    
            // Definir una escala de colores
            const colorScale = scaleOrdinal(schemeTableau10); // Utiliza un esquema de colores predefinido de D3
    
            // Añadir etiqueta de fecha
            const dateLabel = container.append("text")
                                       .attr("class", "date-label")
                                       .attr("x", width - 50) // Centrar en el medio del gráfico
                                       .attr("y", 200) // Posicionado encima de la parte superior del gráfico
                                       .attr("text-anchor", "middle")
                                       .style("font-size", "40px")
                                       .style("font-weight", "bold")
                                       .style("fill", "darkblue");
    
            const update = (date:any) => {
                const presentData = processEachDateData(data.get(date)[0]);
                widthScale.domain([0, d3.max(Object.values(presentData), d => d.value)])
                          .range([0, width - fontSize - 50]);
    
                dateLabel.text(`${date}`);
    
                aTop
                    .transition()
                    .duration(ticker / 1.2)
                    .ease(easeLinear)
                    //.call(axisTop(widthScale));
    
                const sortedRange = [...presentData].sort((a,b) => b.value - a.value);
    
                const texts:any = container.selectAll("text.data-label")
                                       .data(presentData, d => d.key);
    
                texts.enter()
                     .append("text")
                     .attr("class", "data-label")
                     .merge(texts)
                     .text((d:any) => `${d.key} ${d.value}`)
                     .transition()
                     .duration(ticker / 1.2)
                     .delay(500)
                     .attr("x", (d:any) => widthScale(d.value) + fontSize)
                     .attr("y", (d:any,i:any) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding) + fontSize);
    
                const bars:any = container.selectAll("rect")
                                      .data(presentData, d => d.key);
    
                bars.enter()
                    .append("rect")
                    .merge(bars)
                    .attr("fill", (d:any) => colorScale(d.key))  // Asignar color usando la escala
                    .attr("x", 10)
                    .transition()
                    .duration(ticker / 1.2)
                    .delay(500)
                    .attr("y", (d:any,i:any) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding))
                    .attr("width", (d:any) => d.value <= 0 ? 0 : widthScale(d.value))
                    .attr("height", rectProperties.height);
    
                texts.exit().remove();
                bars.exit().remove();
            };
    
            for (const date of dateList) {
                update(date);
                await new Promise(done => setTimeout(done, ticker));
            }
        }
    
        function processData(data:any) { 
            return group(data, (d:any) => d.date);
        }
    
        function processEachDateData(data:any) {
            //remove status and date
            delete data.date;
            delete data.tt; // tt is total 
    
            return Object.keys(data)
                    .map(key => ({ key, value: parseInt(data[key]) }));
        }

        setTimeout(() => {
          (document.querySelector('#cuarta-grafica') as any).style.width = 1000;
        }, 1000);

  
      },
      (error:any) => {
        console.error('Error al obtener los pelis:', error);
      }
    );



  }

//GRAFICO 1
  title = 'barras-frontend';

  private obtenerAnimesPorAnio(): void {
    const url = 'http://localhost:8080/v1/nbAnimesPorAnio';

  this.http.get(url).subscribe(
    (response:any) => {
      const anios = response.nbAnimes;
      const data = anios;
      const ctx = document.getElementById('primera-grafica') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map((row:any) => row.year),
          datasets: [
            {
              label: 'Animes por anio',
              data: data.map((row:any) => row.count)
            }
          ]
        }
      });
    },
    (error:any) => {
      console.error('Error al obtener los animes:', error);
    }
  );

}

private DuracionAnioAnime(): void {
  const url = 'http://localhost:8080/v1/nbDuracionAnioAnime';

this.http.get(url).subscribe(
  (response:any) => {

    const rData = response.duraciones;
    const dt = [];
    for (let r of rData) {
      dt.push({
        x: r.anio,
        y: r.duraciones
      })
    }
    console.log(dt);
    const data = {
      datasets: [{
        label: 'Grafica de dispersion (Duracion episodios por año)',
        data: dt,
        backgroundColor: 'rgb(255, 99, 132)'
      }],
    };

    const ctx = document.getElementById('tercera-grafica') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'scatter',
      data: data,
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      }
    });






  },
  (error:any) => {
    console.error('Error al obtener los animes por anio:', error);
  }
);

}

ngAfterViewInit() {
  this.generarGraficoPaisesPelis();
  //this.initMap();
  this.obtenerAnimesPorAnio();
  this.pintarMapaWords();
  this.DuracionAnioAnime();
  this.pintarBarrasRace();
}

generarGraficoPaisesPelis() {

  const url = 'http://localhost:8080/v1/nbPelisPorPaises';

  this.http.get(url).subscribe(
    (response:any) => {
      const animesPorPaises = response.nbAnimes;
      //const data = anios;

      const paises = [];
      const totales = [];
      for (let aPaises of animesPorPaises) {
        if (aPaises.pais) paises.push(aPaises.pais)
        else paises.push('Otros')
        totales.push(aPaises.total);
      }


      const data = {
        labels: paises,
        datasets: [{
          label: 'Numero de animes por paises',
          data: totales,
          backgroundColor: [
            'rgb(255, 99, 132)',   // Rojo
            'rgb(75, 192, 192)',   // Verde aguamarina
            'rgb(255, 205, 86)',   // Amarillo
            'rgb(201, 203, 207)',  // Gris
            'rgb(54, 162, 235)',   // Azul
            'rgb(153, 102, 255)',  // Morado
            'rgb(255, 159, 64)',   // Naranja
            'rgb(255, 99, 255)',   // Rosa
            'rgb(99, 255, 132)',   // Verde claro
            'rgb(175, 99, 255)',   // Lavanda
            'rgb(255, 100, 100)',  // Coral
            'rgb(100, 200, 255)',  // Celeste
            'rgb(100, 255, 218)',  // Turquesa
            'rgb(255, 255, 100)',  // Amarillo claro
            'rgb(100, 100, 255)',  // Azul rey
            'rgb(214, 100, 255)',  // Púrpura
            'rgb(255, 150, 150)',  // Salmón
            'rgb(150, 255, 255)',  // Cian
            'rgb(150, 150, 255)',  // Lavanda suave
            'rgb(255, 214, 100)',  // Oro
            'rgb(100, 214, 255)',  // Azul cielo
            'rgb(214, 255, 100)',  // Verde lima
            'rgb(100, 255, 150)',  // Menta
            'rgb(255, 100, 214)',  // Magenta
            'rgb(214, 100, 100)',  // Terracota
            'rgb(100, 100, 214)',  // Índigo
            'rgb(100, 214, 100)',  // Verde esmeralda
            'rgb(214, 214, 100)',  // Mostaza
            'rgb(100, 214, 214)',  // Turquesa oscuro
            'rgb(214, 100, 214)'   // Orquídea
        ]
        
        }]
      };
      const ctx = document.getElementById('segunda-grafica') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'polarArea',
        data: data,
        options: {
          plugins: {
            legend: {
              position: 'left'
            }
          },
          scales: {
              r: {
                  max: 10,
                  min: 0,
                  ticks: {
                      stepSize: 1
                  }
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

}
