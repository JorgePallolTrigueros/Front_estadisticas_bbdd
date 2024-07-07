import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { NgIf, NgFor } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

type Libro = {
  id: number;
  nombre: string;
  imagen: string;
  autor: string;
  descripcion: string;
};

@Component({
  selector: 'app-lista-libros',
  standalone: true,
  imports: [
    ButtonModule, 
    NgIf, 
    FormsModule,
    NgFor, 
    DialogModule
  ],
  templateUrl: './lista-libros.component.html',
  styleUrl: './lista-libros.component.css'
})


export class ListaLibrosComponent implements AfterViewInit {

  constructor(private http: HttpClient) { }

  libros: Libro[] = [];
  registrosPaginados: Libro[] = [];
  paginaActual: number = 1;
  registrosPorPagina: number = 9; // Ajusta según necesites
  paginasTotales: number = 0;

  arrayPaginas: number[] = [];

  visible:boolean = false;


  libroSelected:any;



  editando:boolean = false;
  editarNombre:any = null;
  editarImagen:any = null;
  editarAutor:any = null;
  editarDescripcion:any = null;



  private obtenerLibros(): void {
    const url = 'http://localhost:8080/v1/libros';

    this.http.get(url).subscribe(
      (response:any) => {
        const librosResponse = response.libros;
        this.libros = librosResponse;
        this.paginarRegistros();

        this.paginasTotales = this.getTotalPaginas();
        this.arrayPaginas = Array(this.paginasTotales).fill(0).map((x, i) => i + 1);

      },
      (error:any) => {
        console.error('Error al obtener los libros:', error);
      }
    );

  }

  ngAfterViewInit() {
    this.obtenerLibros();
  }

  paginarRegistros() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.registrosPaginados = this.libros.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    this.paginaActual = nuevaPagina;
    this.paginarRegistros();
  }

  getTotalPaginas() {
    return Math.ceil(this.libros.length / this.registrosPorPagina);
  }

  verDetalles(id: number) {
    alert("ID" + id);
  }

  showDialog() {
    this.visible = true;
  }


  
// ----------------------------------------------------------------------------- //





filtrarBusqueda() {
  this.obtenerLibros();
}

cerrarPopup() {
  this.libroSelected = null;
}

editarLibro() {
  this.editando = true;
  this.editarNombre = this.libroSelected.nombre;
  this.editarImagen = this.libroSelected.imagen;
  this.editarAutor = this.libroSelected.autor;
  this.editarDescripcion = this.libroSelected.descripcion;
}

guardarEdicion() {
  const idToEdit = this.libroSelected.id;
  if (!idToEdit) return;

  this.editando = false;
  const url = `http://localhost:8080/v1/libro/${idToEdit}`;

  this.http.put(encodeURI(url), {
    nombre: this.editarNombre,
    autor: this.editarAutor,
    imagen: this.editarImagen,
    descripcion: this.editarDescripcion
  }).subscribe(
    (response:any) => {
      alert("juego-emulador editado correctamente");
    },
    (error:any) => {
      alert('Error al editar el libros');
    }
  );



}

borrarLibro() {

  const idToDelete = this.libroSelected.id;
  if (!idToDelete) return;

  const url = `http://localhost:8080/v1/libros?ids=[${idToDelete}]`;

  this.http.delete(encodeURI(url)).subscribe(
    (response:any) => {
      alert("libros borrado correctamente");
    },
    (error:any) => {
      alert('Error al borrar el libros');
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
