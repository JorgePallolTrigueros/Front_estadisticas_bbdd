import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgIf, NgFor } from '@angular/common';
import { DialogModule } from 'primeng/dialog';


type Peli = {
  id: number;
  titulo: string;
  imagen: string;
  autor: string;
  descripcion: string;
};

@Component({
  selector: 'app-lista-peli',
  standalone: true,
  imports: [
    ButtonModule, 
    FormsModule,
    NgIf, 
    NgFor, 
    DialogModule
  ],
  templateUrl: './listapelis.component.html',
  styleUrl: './listapelis.component.css'
})

export class ListapelisComponent implements AfterViewInit {

  constructor(private http: HttpClient) { }

  pelis: Peli[] = [];
  registrosPaginados: Peli[] = [];
  paginaActual: number = 1;
  registrosPorPagina: number = 9; // Ajusta según necesites
  paginasTotales: number = 0;

  arrayPaginas: number[] = [];

  visible:boolean = false;
  
  busquedaNombre:string = '';
  busquedaAutor:string = '';

  peliSelected:any;

  editando:boolean = false;
  editarNombre:any = null;
  editarImagen:any = null;
  editarAutor:any = null;
  editarDescripcion:any = null;

  private obtenerPelis(): void {
    const url = 'http://localhost:8080/v1/pelis';

    this.http.get(url).subscribe(
      (response:any) => {
        const pelisResponse = response.pelis;

        this.pelis = [];
        for (let peli of pelisResponse) {
          if (!this.busquedaNombre && !this.busquedaAutor) {
            // No se quiere filtrar por nada
            this.pelis.push(peli);
          }
          else if (this.busquedaNombre && !this.busquedaAutor) {
            // Se quiere filtrar solo por nombre
            if (peli.nombre.toLowerCase().includes(this.busquedaNombre.toLowerCase())) this.pelis.push(peli);
          }
          else if (!this.busquedaNombre && this.busquedaAutor) {
            // Se quiere filtrar solo por autor
            if (peli.autor.toLowerCase().includes(this.busquedaAutor.toLowerCase())) this.pelis.push(peli);
          }
          else if (this.busquedaNombre && this.busquedaAutor) {
            // Se quiere filtrar por los dos campos
            if ((peli.nombre.toLowerCase().includes(this.busquedaNombre.toLowerCase())) && (peli.autor.toLowerCase().includes(this.busquedaAutor.toLowerCase()))) {
              this.pelis.push(peli);
            }
          }
        }

        this.paginarRegistros();

        this.paginasTotales = this.getTotalPaginas();
        this.arrayPaginas = Array(this.paginasTotales).fill(0).map((x, i) => i + 1);

      },
      (error:any) => {
        console.error('Error al obtener los pelis:', error);
      }
    );

  }

  ngAfterViewInit() {
    this.obtenerPelis();
  }

  paginarRegistros() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.registrosPaginados = this.pelis.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    this.paginaActual = nuevaPagina;
    this.paginarRegistros();
  }

  getTotalPaginas() {
    return Math.ceil(this.pelis.length / this.registrosPorPagina);
  }

  verDetalles(id: number) {
    const selected = this.pelis.find(item => item.id === id);
    this.peliSelected = selected;
    console.log(selected);
  }

  showDialog() {
    this.visible = true;
  }

  filtrarBusqueda() {
    this.obtenerPelis();
  }

  cerrarPopup() {
    this.peliSelected = null;
  }

  editarPeli() {
    this.editando = true;
    this.editarNombre = this.peliSelected.nombre;
    this.editarImagen = this.peliSelected.imagen;
    this.editarAutor = this.peliSelected.autor;
    this.editarDescripcion = this.peliSelected.descripcion;
  }

  guardarEdicion() {
    const idToEdit = this.peliSelected.id;
    if (!idToEdit) return;

    this.editando = false;
    const url = `http://localhost:8080/v1/pelis/${idToEdit}`;

    this.http.put(encodeURI(url), {
      nombre: this.editarNombre,
      autor: this.editarAutor,
      imagen: this.editarImagen,
      descripcion: this.editarDescripcion
    }).subscribe(
      (response:any) => {
        alert("Peli editado correctamente");
      },
      (error:any) => {
        alert('Error al editar el peli');
      }
    );



  }

  borrarPeli() {

    const idToDelete = this.peliSelected.id;
    if (!idToDelete) return;

    const url = `http://localhost:8080/v1/pelis?ids=[${idToDelete}]`;

    this.http.delete(encodeURI(url)).subscribe(
      (response:any) => {
        alert("Peli borrado correctamente");
      },
      (error:any) => {
        alert('Error al borrar el peli');
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



  
// ----------------------------------------------------------------------------- //





editarpeli() {
  this.editando = true;
  this.editarNombre = this.peliSelected.nombre;
  this.editarImagen = this.peliSelected.imagen;
  this.editarAutor = this.peliSelected.autor;
  this.editarDescripcion = this.peliSelected.descripcion;
}



borrarpeli() {

  const idToDelete = this.peliSelected.id;
  if (!idToDelete) return;

  const url = `http://localhost:8080/v1/pelis?ids=[${idToDelete}]`;

  this.http.delete(encodeURI(url)).subscribe(
    (response:any) => {
      alert("pelis borrado correctamente");
    },
    (error:any) => {
      alert('Error al borrar el pelis');
    }
  );

}



}
