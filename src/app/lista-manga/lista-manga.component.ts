import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { NgIf, NgFor } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';


type Manga = {
  id: number;
  nombre: string;
  imagen: string;
  autor: string;
  descripcion: string;
};

@Component({
  selector: 'app-lista-manga',
  standalone: true,
  imports: [
    ButtonModule, 
    NgIf, 
    FormsModule,
    NgFor, 
    DialogModule
  ],
  templateUrl: './lista-manga.component.html',
  styleUrl: './lista-manga.component.css'
})


export class ListaMangaComponent implements AfterViewInit {

  constructor(private http: HttpClient) { }

  mangas:  Manga[] = [];
  registrosPaginados:  Manga[] = [];
  paginaActual: number = 1;
  registrosPorPagina: number = 9; // Ajusta según necesites
  paginasTotales: number = 0;

  arrayPaginas: number[] = [];

  mangaSelected:any;



  editando:boolean = false;
  editarNombre:any = null;
  editarImagen:any = null;
  editarAutor:any = null;
  editarDescripcion:any = null;




  visible:boolean = false;

  private obtenermangas(): void {
    const url = 'http://localhost:8080/v1/mangas';

    this.http.get(url).subscribe(
      (response:any) => {
        const  mangasResponse = response. mangas;
        this. mangas =  mangasResponse;
        this.paginarRegistros();

        this.paginasTotales = this.getTotalPaginas();
        this.arrayPaginas = Array(this.paginasTotales).fill(0).map((x, i) => i + 1);

      },
      (error:any) => {
        console.error('Error al obtener los  mangas:', error);
      }
    );

  }

  ngAfterViewInit() {
    this.obtenermangas();
  }

  paginarRegistros() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.registrosPaginados = this. mangas.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    this.paginaActual = nuevaPagina;
    this.paginarRegistros();
  }

  getTotalPaginas() {
    return Math.ceil(this. mangas.length / this.registrosPorPagina);
  }

  verDetalles(id: number) {
    alert("ID" + id);
  }

  showDialog() {
    this.visible = true;
  }



  
// ----------------------------------------------------------------------------- //




cerrarPopup() {
  this.mangaSelected = null;
}

editarmanga() {
  this.editando = true;
  this.editarNombre = this.mangaSelected.nombre;
  this.editarImagen = this.mangaSelected.imagen;
  this.editarAutor = this.mangaSelected.autor;
  this.editarDescripcion = this.mangaSelected.descripcion;
}

guardarEdicion() {
  const idToEdit = this.mangaSelected.id;
  if (!idToEdit) return;

  this.editando = false;
  const url = `http://localhost:8080/v1/manga/${idToEdit}`;

  this.http.put(encodeURI(url), {
    nombre: this.editarNombre,
    autor: this.editarAutor,
    imagen: this.editarImagen,
    descripcion: this.editarDescripcion
  }).subscribe(
    (response:any) => {
      alert("manga editado correctamente");
    },
    (error:any) => {
      alert('Error al editar el mangas');
    }
  );



}

borrarmanga() {

  const idToDelete = this.mangaSelected.id;
  if (!idToDelete) return;

  const url = `http://localhost:8080/v1/mangas?ids=[${idToDelete}]`;

  this.http.delete(encodeURI(url)).subscribe(
    (response:any) => {
      alert("mangas borrado correctamente");
    },
    (error:any) => {
      alert('Error al borrar el mangas');
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
