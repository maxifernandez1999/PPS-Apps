import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { firestore, storage } from 'firebase';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';

import * as $ from 'jquery';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage implements OnInit {
  
  subscribe: any;
  foto: any;
  perfil: string = localStorage.getItem("perfil");
  url = [];
  urlOrdenado = [];
  mostrarSoloUsuarios : boolean = false;
  listadoImagenes : any;
  datos: any;
  usuarios
  lista:any[];
  nuevaVar: Observable<any[]>;
  nombredoc: string;


  constructor(public platform: Platform,public router: Router,public camera: Camera,private firestore: AngularFirestore) {

    this.subscribe = this.platform.backButton.subscribeWithPriority(1000,() => {
        this.router.navigate(['main']);
    })

    this.usuarios = firestore.collection('usuarios');

    this.nuevaVar = this.usuarios.valueChanges();
    this.nuevaVar.subscribe(usuarios => this.lista = usuarios, error => console.log(error));
    
    
  }


  ngOnInit() {
    this.traerFotos('todas');
    switch (this.perfil) {
      case 'anonimo':
        this.nombredoc = '6yi65tb1Hvn7oRxVpRr9'; 
        break;

      case 'admin':
        this.nombredoc = 'WKYsqRwXvjQxuVMPs5NE'; 
        break;

      case 'usuario':
        this.nombredoc = 'b0WCbmvbdaLuaQsfbEeP'; 
        break;

      case 'invitado':
        this.nombredoc = 'lUEDsD7tMh0B5OhmWUtS'; 
        break;

      case 'tester':
        this.nombredoc = 'yPlErSqkMWdyF3YJqvhs'; 
        break; 

      default:
        break;
    }
    
  }

  backMain() {
    this.router.navigate(['main']);
  }

  toPerfil() {
    this.router.navigate(['perfil-cosas-feas']);
  }

  toInicio() {
    this.router.navigate(['/cosas-feas']);
  }

  async takePhoto()
  {
    try 
    {
      const options : CameraOptions = {
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum : true,
      correctOrientation : true
      }     
      const result = await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;
      //const pictures = storage().ref('Edificios/cosas_lindas_1.jpeg');
      //pictures.putString(image, 'data_url');
    }
    catch (error) 
    {
      alert(error);
    }
  }

  async subirFoto() {
    const options : CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation : true,
      saveToPhotoAlbum : true
      }

      await this.camera.getPicture(options).then((imageData) => {

        this.foto = 'data:image/jpeg;base64,' + imageData;
  
       }, (err) => {
  
       });
       //let fecha = firebase.database.ServerValue.TIMESTAMP;
       const subirString = storage().ref(`cosas-feas/${this.perfil}_${this.getFecha()}`);
       subirString.putString(this.foto, 'data_url');

       this.traerFotos('todas');


  }

  getFecha() : string
  {
    var fecha = new Date();
    let d,m,y,h,min,s;
    d = fecha.getDate();
    m = fecha.getUTCMonth();
    y = fecha.getFullYear();
    h = fecha.getHours().toString();
    min = fecha.getMinutes().toString();
    s = fecha.getSeconds().toString();

    return d + "-" + m + "-" + y + "--" + h + "-" + min + "-" + s;
  }




  traerFotos(queTraer)
  {
    this.url = []; //array que declaras arriba
    const imagenes = storage().ref("cosas-feas"); //referencia a carpeta
    imagenes.listAll().then((imagenes) => { //listas imagenes en 'imagenes'
    this.listadoImagenes = imagenes.items; //listado imagenes la delcar as antes  y le asignas los items

    for(let path of this.listadoImagenes) // recorro listado
    {

      if(queTraer == "todas")
      {
        this.mostrarSoloUsuarios = false;
      }
      else
      {
        this.mostrarSoloUsuarios = true;
      }

        let array = path.location.path.split("/"); // separo en nombre carpeta y nombre foto
        let arrayMuestra = array[1];
        arrayMuestra = array[1].split("_");
        let validacion = path.location.path.includes(`${this.perfil}`); // verifica que el nombre de user etse en el nombre d el afoto
        let refStorage = storage().ref("cosas-feas"); // 

        if(validacion && this.mostrarSoloUsuarios)
        {
          refStorage.child(array[1]).getDownloadURL().then((dato) =>{ //
            this.datos = {foto: dato,fecha: arrayMuestra[1],usuario: arrayMuestra[0]}
            this.url.push(this.datos);
          });
        }
        else if(!this.mostrarSoloUsuarios)
        {
          refStorage.child(array[1]).getDownloadURL().then((dato) =>{
            this.datos = {foto: dato,fecha: arrayMuestra[1],usuario: arrayMuestra[0]}
            this.url.push(this.datos);
          });
        }

      }

      setTimeout(()=>{
        this.ordenar();
      },1000);
    });
  }

  like(foto) {
    for (const usuario of this.lista) {
      if(usuario.perfil == this.perfil)
      {
        usuario.likes.push(foto.foto);
        this.usuarios.doc(this.nombredoc).update(usuario);
      }
    }
    $("#like").attr('hidden', true);
    $("#dislike").attr('hidden', false);
  }

  dislike(foto) {
    for (const usuario of this.lista) {
      if(usuario.perfil == this.perfil)
      {
        
        let index = usuario.likes.indexOf(foto.foto);
        usuario.likes.splice(index,1);
        this.usuarios.doc(this.nombredoc).update(usuario);
      }
    }
    $("#like").attr('hidden', false);
    $("#dislike").attr('hidden', true);
  }
  
  ordenar()
  {
    this.url.sort((a,b) => {
      if(a.foto < b.foto)
        return 1
      else
        return -1
    })
    console.log(this.url);
    this.urlOrdenado = this.url;
  }

  buscarLike(foto) {

    for (const usuario of this.lista) {
      if(usuario.perfil == this.perfil){
        var usuarioElegido = usuario;
      }

      
    }
    var flag = false;
     for (const likes of usuarioElegido.likes){
       
        if(likes == foto){
          
          flag= true;
          
          break;  
        }
      }
    return flag;
  }
  
}
