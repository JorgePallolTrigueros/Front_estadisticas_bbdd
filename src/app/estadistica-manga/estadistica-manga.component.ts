import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import {TreemapController, TreemapElement} from 'chartjs-chart-treemap';

@Component({
  selector: 'app-estadistica-manga',
  standalone: true,
  imports: [],
  templateUrl: './estadistica-manga.component.html',
  styleUrl: './estadistica-manga.component.css'
})
export class EstadisticaMangaComponent {

  constructor(private http: HttpClient) {
        // Register Chart.js components
        Chart.register(TreemapController, TreemapElement);
  }

  private mangasData:any = [];

  private getMangasData() {
    const url = 'http://localhost:8080/v1/mangas';
  
    this.http.get(url).subscribe(
      (response:any) => {
        const mangasResponse = response.mangas;
        this.mangasData = [];
        mangasResponse.forEach((m:any) => {
          this.mangasData.push({
            año: m.puntos,
            url: m.imagen,
            nombre: m.nombre,
          })
        })
        this.crearGraficaImagenes();
      },
      (error:any) => {
        console.error('Error al obtener los mangas:', error);
      }
    );
  }

  private crearGraficaImagenes() {
    const ctx = (document.getElementById('imagenesChart') as any).getContext('2d');

    // Agrupar películas por año
    const groupedData = this.mangasData.reduce((acc: any, manga: any) => {
        if (!acc[manga.año]) acc[manga.año] = [];
        acc[manga.año].push(manga);
        return acc;
    }, {});

    // Crear dataset para Chart.js
    let chartData: any = [];
    Object.keys(groupedData).forEach((year, index) => {
        const movies = groupedData[year];
        if (movies.length === 1) {
            chartData.push({
                x: year,
                y: 5,  // Coloca la imagen en el medio si solo hay una
                url: movies[0].url,
                nombre: movies[0].nombre
            });
        } else {
            movies.forEach((manga: any) => {
                chartData.push({
                    x: year,
                    y: Math.random() * 10,  // Coloca las imágenes aleatoriamente en el eje Y
                    url: manga.url,
                    nombre: manga.nombre,
                });
            });
        }
    });

    const data = {
        labels: this.mangasData.map((d: any) => d.año),
        datasets: [{
            label: 'Películas',
            data: chartData,
            pointRadius: 20,
            pointHoverRadius: 20,
            pointHitRadius: 20,
            pointBackgroundColor: 'rgba(0, 0, 0, 0)', // Hacer el punto transparente
        }]
    };

    const options: any = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            },
            y: {
                min: 0,
                max: 10,
                ticks: {
                    display: false
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => {
                        return `${tooltipItem.raw.nombre}`;
                    }
                }
            }
        }
    };

    const chart = new Chart(ctx, {
        type: 'bubble',
        data: data,
        options: options,
        plugins: [{
            id: 'customImage',
            afterDatasetDraw: (chart: any) => {
                const ctx = chart.ctx;
                const chartArea = chart.chartArea;
                chart.data.datasets[0].data.forEach((value: any) => {
                    const image = new Image();
                    image.src = value.url;
                    const x = chart.scales.x.getPixelForValue(value.x);
                    const y = chart.scales.y.getPixelForValue(value.y);
                    ctx.drawImage(image, x - 20, y - 20, 40, 40);
                });
            }
        }]
    });
  }

  private crearGraficaTreeMap() {
    const ctx:any = (document.getElementById('treemapChart') as HTMLCanvasElement).getContext('2d');

    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
      '#FF9F40', '#FFCD56', '#C9CBCF'
    ];

    const config:any = {
      type: 'treemap',
      data: {
        datasets: [{
          label: 'Cantidad por autor',
          tree: [
            {autor: 'Pedro', value: 1},
            {autor: 'Isabel', value: 2},
            {autor: 'Pablo', value: 13},
            {autor: 'Juan Rodriguez', value: 4},
            {autor: 'Luis', value: 5},
          ],
          borderColor: 'green',
          borderWidth: 1,
          spacing: 1,
          key: 'value',
          backgroundColor: (context: any) => {
            const index = context.dataIndex;
            return colors[index % colors.length];
          }
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'My treemap chart'
          },
          legend: {
            display: true
          },
          tooltip: {
            callbacks: {
              label: (context:any) => {
                console.log(context);
                const item = context.raw._data;
                return `${item.autor}, Cantidad: ${item.value}`;
              }
            }
          }
        }
      },
    }

    new Chart(ctx, config);
  }

  ngAfterViewInit() {
    this.getMangasData();
    setTimeout(() => {
      this.crearGraficaTreeMap();
    }, 1000);
  }

}
