import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.models';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  listas: Lista[]=[];

  constructor(private toastController: ToastController) { 
    this.loadStorage();
  }

  crearLista(titulo:string){
      const nuevaLista = new Lista(titulo);
      this.listas.push(nuevaLista);
      this.saveStorage();
      return nuevaLista.id;
  }

  saveStorage(){
    localStorage.setItem('data',JSON.stringify(this.listas));
  }
  
  loadStorage(){
    if(localStorage.getItem('data')){
      this.listas = JSON.parse(localStorage.getItem('data'));
    }else{
      this.listas = [];
    }
  }

  getLista(id: number| string){
    id = Number(id);
    return this.listas.find( listaData=> listaData.id === id);
  }

  async msgToast(aux: string) {
    const toast = await this.toastController.create({
      message: aux,
      duration: 1000
    });
    toast.present();
  }

  borrarLista(lista:Lista){
    this.listas = this.listas.filter(listaData=> listaData.id !== lista.id);
    this.saveStorage();
  }
}
