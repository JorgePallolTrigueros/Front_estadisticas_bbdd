import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

type Juego = {
  id: number;
  nombre: string;
  imagen: string;
  autor: string;
  descripcion: string;
};

@Component({
  selector: 'app-juego-emulador',
  standalone: true,
  imports: [
    ButtonModule, 
    FormsModule,
    NgIf, 
    NgFor, 
    DialogModule
  ],
  templateUrl: './lista-juegos-emulador.component.html',
  styleUrl: './lista-juegos-emulador.component.css'
})



export class ListaJuegosEmuladorComponent implements AfterViewInit {

  constructor(private http: HttpClient) { }

  juegos: Juego[] = [];
  registrosPaginados: Juego[] = [];
  paginaActual: number = 1;
  registrosPorPagina: number = 9; // Ajusta según necesites
  paginasTotales: number = 0;

  arrayPaginas: number[] = [];

  visible:boolean = false;



  busquedaNombre:string = '';
  busquedaAutor:string = '';

  juegoEmuladorSelected:any;

  editando:boolean = false;
  editarNombre:any = null;
  editarImagen:any = null;
  editarAutor:any = null;
  editarDescripcion:any = null;



  private obtenerJuegosEmulador(): void {
    const url = 'http://localhost:8080/v1/emuladores';

    this.http.get(url).subscribe(
      (response:any) => {
        const juegosResponse = response.emuladors;
        this.juegos = juegosResponse;
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
    this.obtenerJuegosEmulador();
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




  
// ----------------------------------------------------------------------------- //





filtrarBusqueda() {
  this.obtenerJuegosEmulador();
}



cerrarPopup() {
  this.juegoEmuladorSelected = null;
}

editarJuego() {
  this.editando = true;
  this.editarNombre = this.juegoEmuladorSelected.nombre;
  this.editarImagen = this.juegoEmuladorSelected.imagen;
  this.editarAutor = this.juegoEmuladorSelected.autor;
  this.editarDescripcion = this.juegoEmuladorSelected.descripcion;
}

guardarEdicion() {
  const idToEdit = this.juegoEmuladorSelected.id;
  if (!idToEdit) return;

  this.editando = false;
  const url = `http://localhost:8080/v1/juegos-emulador/${idToEdit}`;

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
      alert('Error al editar el juego');
    }
  );



}

borrarJuego() {

  const idToDelete = this.juegoEmuladorSelected.id;
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
