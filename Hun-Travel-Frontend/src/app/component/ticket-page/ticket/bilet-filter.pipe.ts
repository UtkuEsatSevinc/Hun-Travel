import { Pipe, PipeTransform } from '@angular/core';
import { Bilet } from './bilet';

@Pipe({
  name: 'biletFilter',
})
export class BiletFilterPipe implements PipeTransform {
  transform(
    value: Bilet[][],
    gun: number,
    filterText?: string,
    seferFilters?: { kalkisYeri: string; varisYeri: string; seferSaat: string }
  ): Bilet[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : undefined;

    let guneGore = this.gunFilter(value, gun);

    if (seferFilters) {
      guneGore = guneGore.filter(
        (b: Bilet) =>
          (seferFilters.kalkisYeri
            ? b.kalkis === seferFilters.kalkisYeri
            : true) &&
          (seferFilters.varisYeri
            ? b.varis === seferFilters.varisYeri
            : true) &&
          (seferFilters.seferSaat
            ? b.kalkisSaat === seferFilters.seferSaat
            : true)
      );
    }

    // please add other functions here

    return filterText
      ? guneGore.filter(
          (b: Bilet) => b.name.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : guneGore;
  }

  gunFilter(value: Bilet[][], gun: number): Bilet[] {
    return value[gun];
  }

  // Please add other filters as functions here
}
