import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { NgIf, NgFor } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

type Serie = {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  autor: string;
};

@Component({
  selector: 'app-lista-serie',
  standalone: true,
  imports: [
    ButtonModule, 
    NgIf, 
    FormsModule,
    NgFor, 
    DialogModule
  ],
  templateUrl: './lista-serie.component.html',
  styleUrl: './lista-serie.component.css'
})

export class ListaSerieComponent implements AfterViewInit {


  constructor(private http: HttpClient) { }

  Series: Serie[] = [];
  registrosPaginados: Serie[] = [];
  paginaActual: number = 1;
  registrosPorPagina: number = 9; // Ajusta según necesites
  paginasTotales: number = 0;

  arrayPaginas: number[] = [];

  visible:boolean = false;

  serieSelected:any;

  editando:boolean = false;
  editarNombre:any = null;
  editarImagen:any = null;
  editarAnio:any = null;
  editarDescripcion:any = null;

  private obtenerSeries(): void {
    const url = 'http://localhost:8080/v1/series';

    this.http.get(url).subscribe(
      (response:any) => {
        const seriesResponse = response.series;
        this.Series = seriesResponse;
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
    this.obtenerSeries();
  }

  paginarRegistros() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.registrosPaginados = this.Series.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    this.paginaActual = nuevaPagina;
    this.paginarRegistros();
  }

  getTotalPaginas() {
    return Math.ceil(this.Series.length / this.registrosPorPagina);
  }

  verDetalles(id: number) {
    alert("ID" + id);
  }

  showDialog() {
    this.visible = true;
  }




  
// ----------------------------------------------------------------------------- //



filtrarBusqueda() {
  this.obtenerSeries();
}

cerrarPopup() {
  this.serieSelected = null;
}

editarSerie() {
  this.editando = true;
  this.editarNombre = this.serieSelected.nombre;
  this.editarImagen = this.serieSelected.imagen;
  this.editarAnio = this.serieSelected.anio;
  this.editarDescripcion = this.serieSelected.descripcion;
}

guardarEdicion() {
  const idToEdit = this.serieSelected.id;
  if (!idToEdit) return;

  this.editando = false;
  const url = `http://localhost:8080/v1/serie/${idToEdit}`;

  this.http.put(encodeURI(url), {
    nombre: this.editarNombre,
    autor: this.editarAnio,
    imagen: this.editarImagen,
    descripcion: this.editarDescripcion
  }).subscribe(
    (response:any) => {
      alert("serie editado correctamente");
    },
    (error:any) => {
      alert('Error al editar el series');
    }
  );



}

borrarSerie() {

  const idToDelete = this.serieSelected.id;
  if (!idToDelete) return;

  const url = `http://localhost:8080/v1/series?ids=[${idToDelete}]`;

  this.http.delete(encodeURI(url)).subscribe(
    (response:any) => {
      alert("series borrado correctamente");
    },
    (error:any) => {
      alert('Error al borrar el series');
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
