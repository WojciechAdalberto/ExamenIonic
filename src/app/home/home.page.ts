import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { HttpClient }
from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombre: string = "";
  edad: string = "";

  dataSend: DatosX = {
    nombre: "Alan",
    edad: "34"
  }
  constructor(
      private fire: AngularFirestore,
      private http: HttpClient){
        this.fire.collection<DatosX>("/personas/")
            .valueChanges()
            .subscribe((data)=>{
              this.nombre = data[0].nombre;
              this.edad = data[0].edad;
            });


      }

  save(){
    let idDoc = this.fire.createId();
    this.fire.doc("/personas23/" + idDoc)
    .set(this.dataSend);
  }

  consulta(){
    this.http.
    get("https://jsonplaceholder.typicode.com/users")
    .subscribe((data)=>{
      console.log("Users: ", data);
    });
  }

}

interface DatosX {
  nombre?: string;
  edad?: string;
}
