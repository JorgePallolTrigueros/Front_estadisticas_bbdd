import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgIf, NgFor } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

type Juego = {
  id: number;
  titulo: string;
  imagen: string;
  plataformas: string;
  generos: string;
  autor: string;
  descripcion: string;
};

@Component({
  selector: 'app-lista-juegos',
  standalone: true,
  imports: [
    ButtonModule, 
    FormsModule,
    NgIf, 
    NgFor, 
    DialogModule
  ],
  templateUrl: './lista-juegos.component.html',
  styleUrl: './lista-juegos.component.css'
})




export class ListaJuegosComponent implements AfterViewInit {

  constructor(private http: HttpClient) { }

  juegos: Juego[] = [];
  registrosPaginados: Juego[] = [];
  paginaActual: number = 1;
  registrosPorPagina: number = 9; // Ajusta según necesites
  paginasTotales: number = 0;

  arrayPaginas: number[] = [];

  visible:boolean = false;

  juegoSelected:any;

  editando:boolean = false;
  editarTitulo:any = null;
  editarImagen:any = null;
  editarPlataformas:any = null;
  editarGeneros:any = null;
  editarDescripcion:any = null;

  busquedaNombre:string = '';
  busquedaPlataforma:string = '';
  busquedaGenero:string = '';

  private obtenerJuegos(): void {
    const url = 'http://localhost:8080/v1/juegos';

    this.http.get(url).subscribe(
      (response:any) => {


        const juegosResponse = response.juegos;

        this.juegos = [];
        for (let juego of juegosResponse) {
    
          let anadir = true;

          if (this.busquedaNombre) {
            if (!juego.titulo.toLowerCase().includes(this.busquedaNombre.toLowerCase())) {
              anadir = false;
            }
          }

          if (this.busquedaPlataforma) {
            if (!juego.plataformas.toLowerCase().includes(this.busquedaPlataforma.toLowerCase())) {
              anadir = false;
            }
          }

          if (this.busquedaGenero) {
            if (!juego.generos.toLowerCase().includes(this.busquedaGenero.toLowerCase())) {
              anadir = false;
            }
          }

          if (anadir) this.juegos.push(juego);

        }

        this.paginarRegistros();

        this.paginasTotales = this.getTotalPaginas();
        this.arrayPaginas = Array(this.paginasTotales).fill(0).map((x, i) => i + 1);




      },
      (error:any) => {
        console.error('Error al obtener los juegos:', error);
      }
    );

  }




// ----------------------------------------------------------------------------- //







  ngAfterViewInit() {
    this.obtenerJuegos();
  }

  paginarRegistros() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.registrosPaginados = this.juegos.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    this.paginaActual = nuevaPagina;
    this.paginarRegistros();
  }

  getTotalPaginas() {
    return Math.ceil(this.juegos.length / this.registrosPorPagina);
  }

  verDetalles(id: number) {
    alert("ID" + id);
  }

  showDialog() {
    this.visible = true;
  }

  filtrarBusqueda() {
    this.obtenerJuegos();
  }


  
  cerrarPopup() {
    this.juegoSelected = null;
  }

  editarJuego() {

    
    this.editando = true;
    this.editarTitulo = this.juegoSelected.titulo;
    this.editarImagen = this.juegoSelected.imagen;
    this.editarPlataformas = this.juegoSelected.plataformas;
    this.editarGeneros = this.juegoSelected.generos;  
    this.editarDescripcion = this.juegoSelected.descripcion;




  }

  guardarEdicion() {
    const idToEdit = this.juegoSelected.id;
    if (!idToEdit) return;

    this.editando = false;
    const url = `http://localhost:8080/v1/juegos/${idToEdit}`;

    this.http.put(encodeURI(url), {
      titulo: this.editarTitulo,
      plataforma: this.editarPlataformas,
      generos: this.editarGeneros,
      imagen: this.editarImagen,
      descripcion: this.editarDescripcion
    }).subscribe(
      (response:any) => {
        alert("juego editado correctamente");
      },
      (error:any) => {
        alert('Error al editar el juego');
      }
    );



  }

  borrarJuego() {

    const idToDelete = this.juegoSelected.id;
    if (!idToDelete) return;

    const url = `http://localhost:8080/v1/juegos?ids=[${idToDelete}]`;

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
