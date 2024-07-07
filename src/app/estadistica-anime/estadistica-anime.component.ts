
import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import Chart from 'chart.js/auto';
import { WordCloudChart } from 'chartjs-chart-wordcloud';
import * as L from 'leaflet';


@Component({
  selector: 'app-estadistica-anime',
  standalone: true,
  imports: [],
  templateUrl: './estadistica-anime.component.html',
  styleUrl: './estadistica-anime.component.css'
})
export class EstadisticaAnimeComponent implements AfterViewInit {
  constructor(private http: HttpClient) { }


  private map:any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 2
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 5,
      minZoom: 1,
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
  this.generarGraficoPaisesAnimes();
  this.initMap();
  this.obtenerAnimesPorAnio();
  this.pintarMapaWords();
  this.DuracionAnioAnime();
}



pintarMarcadoresMapa(datos:any) {

  const coordinates:any = {
    'Afganistán': { lat: 33.93911, lon: 67.709953 },
    'Albania': { lat: 41.153332, lon: 20.168331 },
    'Alemania': { lat: 51.165691, lon: 10.451526 },
    'Andorra': { lat: 42.546245, lon: 1.601554 },
    'Angola': { lat: -11.202692, lon: 17.873887 },
    'Arabia Saudita': { lat: 23.885942, lon: 45.079162 },
    'Argelia': { lat: 28.033886, lon: 1.659626 },
    'Argentina': { lat: -38.416097, lon: -63.616672 },
    'Armenia': { lat: 40.069099, lon: 45.038189 },
    'Australia': { lat: -25.274398, lon: 133.775136 },
    'Austria': { lat: 47.516231, lon: 14.550072 },
    'Azerbaiyán': { lat: 40.143105, lon: 47.576927 },
    'Bangladés': { lat: 23.684994, lon: 90.356331 },
    'Bélgica': { lat: 50.503887, lon: 4.469936 },
    'Bielorrusia': { lat: 53.709807, lon: 27.953389 },
    'Birmania': { lat: 21.916221, lon: 95.955974 },
    'Bolivia': { lat: -16.290154, lon: -63.588653 },
    'Bosnia y Herzegovina': { lat: 43.915886, lon: 17.679076 },
    'Botsuana': { lat: -22.328474, lon: 24.684866 },
    'Brasil': { lat: -14.235004, lon: -51.92528 },
    'Bulgaria': { lat: 42.733883, lon: 25.48583 },
    'Camboya': { lat: 12.565679, lon: 104.990963 },
    'Camerún': { lat: 7.369722, lon: 12.354722 },
    'Canadá': { lat: 56.130366, lon: -106.346771 },
    'Chile': { lat: -35.675147, lon: -71.542969 },
    'China': { lat: 35.86166, lon: 104.195397 },
    'Chipre': { lat: 35.126413, lon: 33.429859 },
    'Colombia': { lat: 4.570868, lon: -74.297333 },
    'Corea del Norte': { lat: 40.339852, lon: 127.510093 },
    'Corea del Sur': { lat: 35.907757, lon: 127.766922 },
    'Costa Rica': { lat: 9.748917, lon: -83.753428 },
    'Croacia': { lat: 45.1, lon: 15.2 },
    'Cuba': { lat: 21.521757, lon: -77.781167 },
    'Dinamarca': { lat: 56.26392, lon: 9.501785 },
    'Ecuador': { lat: -1.831239, lon: -78.183406 },
    'Egipto': { lat: 26.820553, lon: 30.802498 },
    'El Salvador': { lat: 13.794185, lon: -88.89653 },
    'Emiratos Árabes Unidos': { lat: 23.424076, lon: 53.847818 },
    'Eslovaquia': { lat: 48.669026, lon: 19.699024 },
    'Eslovenia': { lat: 46.151241, lon: 14.995463 },
    'España': { lat: 40.463667, lon: -3.74922 },
    'Estados Unidos': { lat: 37.09024, lon: -95.712891 },
    'Estonia': { lat: 58.595272, lon: 25.013607 },
    'Etiopía': { lat: 9.145, lon: 40.489673 },
    'Filipinas': { lat: 12.879721, lon: 121.774017 },
    'Finlandia': { lat: 61.92411, lon: 25.748151 },
    'Francia': { lat: 46.603354, lon: 1.888334 },
    'Gabón': { lat: -0.803689, lon: 11.609444 },
    'Gambia': { lat: 13.443182, lon: -15.310139 },
    'Georgia': { lat: 42.315407, lon: 43.356892 },
    'Ghana': { lat: 7.946527, lon: -1.023194 },
    'Grecia': { lat: 39.074208, lon: 21.824312 },
    'Guatemala': { lat: 15.783471, lon: -90.230759 },
    'Guinea': { lat: 9.945587, lon: -9.696645 },
    'Haití': { lat: 18.971187, lon: -72.285215 },
    'Honduras': { lat: 15.199999, lon: -86.241905 },
    'Hungría': { lat: 47.162494, lon: 19.503304 },
    'India': { lat: 20.593684, lon: 78.96288 },
    'Indonesia': { lat: -0.789275, lon: 113.921327 },
    'Irak': { lat: 33.223191, lon: 43.679291 },
    'Irán': { lat: 32.427908, lon: 53.688046 },
    'Irlanda': { lat: 53.41291, lon: -8.24389 },
    'Islandia': { lat: 64.963051, lon: -19.020835 },
    'Israel': { lat: 31.046051, lon: 34.851612 },
    'Italia': { lat: 41.87194, lon: 12.56738 },
    'Jamaica': { lat: 18.109581, lon: -77.297508 },
    'Japón': { lat: 36.204824, lon: 138.252924 },
    'Jordania': { lat: 30.585164, lon: 36.238414 },
    'Kazajistán': { lat: 48.019573, lon: 66.923684 },
    'Kenia': { lat: -0.023559, lon: 37.906193 },
    'Kirguistán': { lat: 41.20438, lon: 74.766098 },
    'Kuwait': { lat: 29.31166, lon: 47.481766 },
    'Laos': { lat: 19.85627, lon: 102.495496 },
    'Letonia': { lat: 56.879635, lon: 24.603189 },
    'Líbano': { lat: 33.854721, lon: 35.862285 },
    'Liberia': { lat: 6.428055, lon: -9.429499 },
    'Libia': { lat: 26.3351, lon: 17.228331 },
    'Lituania': { lat: 55.169438, lon: 23.881275 },
    'Luxemburgo': { lat: 49.815273, lon: 6.129583 },
    'Madagascar': { lat: -18.766947, lon: 46.869107 },
    'Malasia': { lat: 4.210484, lon: 101.975766 },
    'Malaui': { lat: -13.254308, lon: 34.301525 },
    'Maldivas': { lat: 3.202778, lon: 73.22068 },
    'Malí': { lat: 17.570692, lon: -3.996166 },
    'Malta': { lat: 35.937496, lon: 14.375416 },
    'Marruecos': { lat: 31.791702, lon: -7.09262 },
    'Mauritania': { lat: 21.00789, lon: -10.940835 },
    'México': { lat: 23.634501, lon: -102.552784 },
    'Moldavia': { lat: 47.411631, lon: 28.369885 },
    'Mongolia': { lat: 46.862496, lon: 103.846656 },
    'Montenegro': { lat: 42.708678, lon: 19.37439 },
    'Mozambique': { lat: -18.665695, lon: 35.529562 },
    'Namibia': { lat: -22.95764, lon: 18.49041 },
    'Nepal': { lat: 28.394857, lon: 84.124008 },
    'Nicaragua': { lat: 12.865416, lon: -85.207229 },
    'Níger': { lat: 17.607789, lon: 8.081666 },
    'Nigeria': { lat: 9.081999, lon: 8.675277 },
    'Noruega': { lat: 60.472024, lon: 8.468946 },
    'Nueva Zelanda': { lat: -40.900557, lon: 174.885971 },
    'Omán': { lat: 21.512583, lon: 55.923255 },
    'Países Bajos': { lat: 52.132633, lon: 5.291266 },
    'Pakistán': { lat: 30.375321, lon: 69.345116 },
    'Panamá': { lat: 8.537981, lon: -80.782127 },
    'Papúa Nueva Guinea': { lat: -6.314993, lon: 143.95555 },
    'Paraguay': { lat: -23.442503, lon: -58.443832 },
    'Perú': { lat: -9.189967, lon: -75.015152 },
    'Polonia': { lat: 51.919438, lon: 19.145136 },
    'Portugal': { lat: 39.399872, lon: -8.224454 },
    'Reino Unido': { lat: 55.378051, lon: -3.435973 },
    'República Checa': { lat: 49.817492, lon: 15.472962 },
    'República Dominicana': { lat: 18.735693, lon: -70.162651 },
    'Rumanía': { lat: 45.943161, lon: 24.96676 },
    'Rusia': { lat: 61.52401, lon: 105.318756 },
    'Senegal': { lat: 14.497401, lon: -14.452362 },
    'Serbia': { lat: 44.016521, lon: 21.005859 },
    'Singapur': { lat: 1.352083, lon: 103.819836 },
    'Siria': { lat: 34.802075, lon: 38.996815 },
    'Somalia': { lat: 5.152149, lon: 46.199616 },
    'Sri Lanka': { lat: 7.873054, lon: 80.771797 },
    'Sudáfrica': { lat: -30.559482, lon: 22.937506 },
    'Sudán': { lat: 12.862807, lon: 30.217636 },
    'Suecia': { lat: 60.128161, lon: 18.643501 },
    'Suiza': { lat: 46.818188, lon: 8.227512 },
    'Surinam': { lat: 3.919305, lon: -56.027783 },
    'Tailandia': { lat: 15.870032, lon: 100.992541 },
    'Tanzania': { lat: -6.369028, lon: 34.888822 },
    'Túnez': { lat: 33.886917, lon: 9.537499 },
    'Turquía': { lat: 38.963745, lon: 35.243322 },
    'Ucrania': { lat: 48.379433, lon: 31.16558 },
    'Uganda': { lat: 1.373333, lon: 32.290275 },
    'Uruguay': { lat: -32.522779, lon: -55.765835 },
    'Uzbekistán': { lat: 41.377491, lon: 64.585262 },
    'Venezuela': { lat: 6.42375, lon: -66.58973 },
    'Vietnam': { lat: 14.058324, lon: 108.277199 },
    'Yemen': { lat: 15.552727, lon: 48.516388 },
    'Zambia': { lat: -13.133897, lon: 27.849332 },
    'Zimbabue': { lat: -19.015438, lon: 29.154857 },
    'Taiwán': { lat: 23.69781, lon: 120.960515 }
};

  function addCoordinates(array:any) {
      return array.map((item:any) => {
          const coords:any = coordinates[item.pais];
          return {
              ...item,
              latitud: coords ? coords.lat : null,
              longitud: coords ? coords.lon : null
          };
      });
  }

  const datosConCoordenadas = addCoordinates(datos);

  for (const dt of datosConCoordenadas) {
    if (!dt || !dt.latitud) continue;
    this.drawMarker(dt.latitud, dt.longitud, `${dt.pais}: ${dt.total}`);
  }
  
}



generarGraficoPaisesAnimes() {

  const url = 'http://localhost:8080/v1/nbAnimesPorPaises';

  this.http.get(url).subscribe(
    (response:any) => {
      const animesPorPaises = response.nbAnimes;
      // Aprovechamos la peticion para pintar los marcadores del mapa
      this.pintarMarcadoresMapa(animesPorPaises);
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
