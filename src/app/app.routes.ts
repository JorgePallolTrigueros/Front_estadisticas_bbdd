import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListapelisComponent } from './listapelis/listapelis.component';



import { ListaAnimeComponent } from './lista-anime/lista-anime.component';
import { ListaComicComponent } from './lista-comic/lista-comic.component';
import { ListaJuegosComponent } from './lista-juegos/lista-juegos.component';
import { ListaLibrosComponent } from './lista-libros/lista-libros.component';
import { ListaMangaComponent } from './lista-manga/lista-manga.component';
import { ListaMangaVoseComponent } from './lista-manga-vose/lista-manga-vose.component';
import { ListaAnimeVoseComponent } from './lista-anime-vose/lista-anime-vose.component';
import { ListaSerieComponent } from './lista-serie/lista-serie.component';
import { ListaJuegosEmuladorComponent } from './lista-juegos-emulador/lista-juegos-emulador.component';


import { EstadisticaPelisComponent } from './estadistica-pelis/estadistica-pelis.component';
import { EstadisticaAnimeComponent } from './estadistica-anime/estadistica-anime.component';
import { EstadisticaComicComponent } from './estadistica-comic/estadistica-comic.component';
import { EstadisticaJuegosComponent } from './estadistica-juegos/estadistica-juegos.component';
import { EstadisticaLibrosComponent } from './estadistica-libros/estadistica-libros.component';
import { EstadisticaMangaComponent } from './estadistica-manga/estadistica-manga.component';
import { EstadisticaMangaVoseComponent } from './estadistica-manga-vose/estadistica-manga-vose.component';
import { EstadisticaAnimeVoseComponent } from './estadistica-anime-vose/estadistica-anime-vose.component';
import { EstadisticaSerieComponent } from './estadistica-serie/estadistica-serie.component';
import { EstadisticaJuegosEmuladorComponent } from './estadistica-juegos-emulador/estadistica-juegos-emulador.component';

EstadisticaMangaVoseComponent

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'listapelis', component: ListapelisComponent },
    { path: 'listaAnimeVose', component: ListaAnimeVoseComponent },
    { path: 'listaseries', component: ListaSerieComponent },
    { path: 'listalibros', component: ListaLibrosComponent },
    { path: 'listamanga', component: ListaMangaComponent },
    { path: 'listajuegos', component: ListaJuegosComponent },
    { path: 'listacomics', component: ListaComicComponent },
    { path: 'listaanimes', component: ListaAnimeComponent },
    { path: 'listajuegosemulador', component: ListaJuegosEmuladorComponent },
    { path: 'listamangavose', component:ListaMangaVoseComponent  },
    { path: 'estadisticapelis', component: EstadisticaPelisComponent },
    { path: 'estadisticaAnimeVose', component: EstadisticaAnimeVoseComponent },
    { path: 'estadisticaseries', component: EstadisticaSerieComponent },
    { path: 'estadisticalibros', component: EstadisticaLibrosComponent },
    { path: 'estadisticamanga', component: EstadisticaMangaComponent },
    { path: 'estadisticamangavose', component: EstadisticaMangaVoseComponent },
    { path: 'estadisticajuegos', component: EstadisticaJuegosComponent },
    { path: 'estadisticacomics', component: EstadisticaComicComponent },
    { path: 'estadisticaanimes', component: EstadisticaAnimeComponent },
    { path: 'estadisticajuegosemulador', component: EstadisticaJuegosEmuladorComponent }
];

