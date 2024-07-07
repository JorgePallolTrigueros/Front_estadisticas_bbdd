import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgIf, NgFor } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

type Comic = {
  id: number;
  nombre: string;
  imagen: string;
  autor: string;
  descripcion: string;
};

@Component({
  selector: 'app-lista-comic',
  standalone: true,
  imports: [
    ButtonModule, 
    FormsModule,
    NgIf, 
    NgFor, 
    DialogModule
  ],
  templateUrl: './lista-comic.component.html',
  styleUrl: './lista-comic.component.css'
})

export class ListaComicComponent implements AfterViewInit {

  constructor(private http: HttpClient) { }

  comics: Comic[] = [];
  registrosPaginados: Comic[] = [];
  paginaActual: number = 1;
  registrosPorPagina: number = 9; // Ajusta según necesites
  paginasTotales: number = 0;

  arrayPaginas: number[] = [];

  visible:boolean = false;
  
  busquedaNombre:string = '';
  busquedaAutor:string = '';

  comicSelected:any;

  editando:boolean = false;
  editarNombre:any = null;
  editarImagen:any = null;
  editarAutor:any = null;
  editarDescripcion:any = null;

  private obtenerComics(): void {
    const url = 'http://localhost:8080/v1/comics';

    this.http.get(url).subscribe(
      (response:any) => {
        const comicsResponse = response.comics;

        this.comics = [];
        for (let comic of comicsResponse) {
          if (!this.busquedaNombre && !this.busquedaAutor) {
            // No se quiere filtrar por nada
            this.comics.push(comic);
          }
          else if (this.busquedaNombre && !this.busquedaAutor) {
            // Se quiere filtrar solo por nombre
            if (comic.nombre.toLowerCase().includes(this.busquedaNombre.toLowerCase())) this.comics.push(comic);
          }
          else if (!this.busquedaNombre && this.busquedaAutor) {
            // Se quiere filtrar solo por autor
            if (comic.autor.toLowerCase().includes(this.busquedaAutor.toLowerCase())) this.comics.push(comic);
          }
          else if (this.busquedaNombre && this.busquedaAutor) {
            // Se quiere filtrar por los dos campos
            if ((comic.nombre.toLowerCase().includes(this.busquedaNombre.toLowerCase())) && (comic.autor.toLowerCase().includes(this.busquedaAutor.toLowerCase()))) {
              this.comics.push(comic);
            }
          }
        }

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
    this.obtenerComics();
  }

  paginarRegistros() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.registrosPaginados = this.comics.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    this.paginaActual = nuevaPagina;
    this.paginarRegistros();
  }

  getTotalPaginas() {
    return Math.ceil(this.comics.length / this.registrosPorPagina);
  }

  verDetalles(id: number) {
    const selected = this.comics.find(item => item.id === id);
    this.comicSelected = selected;
    console.log(selected);
  }

  showDialog() {
    this.visible = true;
  }

  filtrarBusqueda() {
    this.obtenerComics();
  }

  cerrarPopup() {
    this.comicSelected = null;
  }

  editarComic() {
    this.editando = true;
    this.editarNombre = this.comicSelected.nombre;
    this.editarImagen = this.comicSelected.imagen;
    this.editarAutor = this.comicSelected.autor;
    this.editarDescripcion = this.comicSelected.descripcion;
  }

  guardarEdicion() {
    const idToEdit = this.comicSelected.id;
    if (!idToEdit) return;

    this.editando = false;
    const url = `http://localhost:8080/v1/comics/${idToEdit}`;

    this.http.put(encodeURI(url), {
      nombre: this.editarNombre,
      autor: this.editarAutor,
      imagen: this.editarImagen,
      descripcion: this.editarDescripcion
    }).subscribe(
      (response:any) => {
        alert("Comic editado correctamente");
      },
      (error:any) => {
        alert('Error al editar el comic');
      }
    );



  }

  borrarComic() {

    const idToDelete = this.comicSelected.id;
    if (!idToDelete) return;

    const url = `http://localhost:8080/v1/comics?ids=[${idToDelete}]`;

    this.http.delete(encodeURI(url)).subscribe(
      (response:any) => {
        alert("Comic borrado correctamente");
      },
      (error:any) => {
        alert('Error al borrar el comic');
      }
    );

  }



  subirImagen(event: any): void {
    const archivo = event.target.files[0];
    if (archivo) {
      const formData = new FormData();
      formData.append('fileToUpload', archivo, archivo.name);
  
      const urlUpload = 'http://pruebasjorgepallol1.com/upload.php';
  
      this.http.post(urlUpload, formData).subscribe({
        next: (response: any) => {
          console.log('Imagen subida con éxito', response);
          this.editarImagen = response.url;
        },
        error: (error) => {
          console.error('Error al subir la imagen:', error);
        }
      });
    }
  }


}
