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
  selector: 'app-lista-manga-vose',
  standalone: true,
  imports: [
    ButtonModule, 
    NgIf, 
    FormsModule,
    NgFor, 
    DialogModule
  ],
  templateUrl: './lista-manga-vose.component.html',
  styleUrl: './lista-manga-vose.component.css'
})

export class ListaMangaVoseComponent implements AfterViewInit {

  constructor(private http: HttpClient) { }

  mangas:  Manga[] = [];
  registrosPaginados:  Manga[] = [];
  paginaActual: number = 1;
  registrosPorPagina: number = 9; // Ajusta según necesites
  paginasTotales: number = 0;

  arrayPaginas: number[] = [];


  mangavoseSelected:any;



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
  this.mangavoseSelected = null;
}

editarmangavose() {
  this.editando = true;
  this.editarNombre = this.mangavoseSelected.nombre;
  this.editarImagen = this.mangavoseSelected.imagen;
  this.editarAutor = this.mangavoseSelected.autor;
  this.editarDescripcion = this.mangavoseSelected.descripcion;
}

guardarEdicion() {
  const idToEdit = this.mangavoseSelected.id;
  if (!idToEdit) return;

  this.editando = false;
  const url = `http://localhost:8080/v1/manga-vose/${idToEdit}`;

  this.http.put(encodeURI(url), {
    nombre: this.editarNombre,
    autor: this.editarAutor,
    imagen: this.editarImagen,
    descripcion: this.editarDescripcion
  }).subscribe(
    (response:any) => {
      alert("manga-vose editado correctamente");
    },
    (error:any) => {
      alert('Error al editar el manga-voses');
    }
  );



}

borrarmangavose() {

  const idToDelete = this.mangavoseSelected.id;
  if (!idToDelete) return;

  const url = `http://localhost:8080/v1/manga-voses?ids=[${idToDelete}]`;

  this.http.delete(encodeURI(url)).subscribe(
    (response:any) => {
      alert("manga-voses borrado correctamente");
    },
    (error:any) => {
      alert('Error al borrar el manga-voses');
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
