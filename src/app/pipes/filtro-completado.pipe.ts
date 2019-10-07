import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.models';

@Pipe({
  name: 'filtroCompletado',
  pure: false
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], terminada: boolean = true): Lista[] {
    return listas.filter(list =>  list.terminada === terminada);
  }

}
