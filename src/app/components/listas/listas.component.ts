import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.models';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true; 

  constructor(public deseosService: DeseosService, private alertCtrl: AlertController, private router:Router) { }

  listaSeleccionada(lista:Lista){
    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }else
    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  }

  getActRestantes(lista:Lista): string{
    let total:number=0;
      for(let i=0; i < lista.items.length; i++){
        if(!lista.items[i].completado){
          total+=1;
        }
      }
      if(total === 0){
        return "Actividades completadas";
      }else{
        if(total === 1){
          return total+" actividad sin completar";
        }else
          return total+" actividades sin completar";
      }
        
    
  }
  async borrarLista(lista:Lista){
    const alert = await this.alertCtrl.create({
      header: '¿Desea borrar la tarea?',
      buttons: [{
                  text:'Cancelar',
                  role:'cancel',
                  handler:()=>{
                    this.lista.closeSlidingItems();
                    return;
                  }
                },
                { 
                  text:'Aceptar',
                  handler:(data)=>{
                    this.deseosService.borrarLista(lista);
                    this.deseosService.msgToast("Lista borrada!");
                    this.lista.closeSlidingItems();
                  }
                }]
              });
    alert.present();
  }
  
  async editarLista(lista: Lista){
    const alert = await this.alertCtrl.create({
      header: 'Actualizar nombre de la tarea ' + lista.titulo,
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nuevo nombre'
        }
      ],
      buttons: [{
                  text:'Cancelar',
                  role:'cancel',
                  handler:()=>{
                    this.lista.closeSlidingItems();
                    return;
                  }
                },
                { 
                  text:'Actualizar',
                  handler:(data)=>{ 
                    if(data.titulo.length === 0){
                      return;
                    }
                    lista.titulo = data.titulo;
                    this.deseosService.saveStorage();
                    this.lista.closeSlidingItems();
                  }
                }]
              });
    alert.present();
  }

  ngOnInit() {}

}
