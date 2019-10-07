import { Component, OnInit } from '@angular/core';
import { Lista } from 'src/app/models/lista.models';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.models';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem = '';

  constructor(private deseosService:DeseosService, private route: ActivatedRoute, private toastController: ToastController) {
    const listaId = this.route.snapshot.paramMap.get('listaId'); 
    this.lista = this.deseosService.getLista(listaId);
  }

  agregarItem(){
    if(this.nombreItem.length === 0){
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem = '';
    this.deseosService.saveStorage();
  } 

  cambioCheck(item: ListaItem){
    const pendientes = this.lista.items.filter(itemData=> !itemData.completado).length;
    if(pendientes === 0){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
      this.deseosService.msgToast("Haz terminado todas las actividades!");
    }else{
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }
    this.deseosService.saveStorage();
  }

  delete(i:number){
    this.lista.items.splice(i,1);
    this.deseosService.msgToast("Se ha eliminado la actividad...");
    this.deseosService.saveStorage();
  }

  

  ngOnInit() {
  }

}
