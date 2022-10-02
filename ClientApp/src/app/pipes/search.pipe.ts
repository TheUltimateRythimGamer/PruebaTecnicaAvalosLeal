import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'customSearch'
})
export class SearchPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val: any) => {
            let rVal = (val.id.toString().toLocaleLowerCase().includes(args)) || (val.nombre.toLocaleLowerCase().includes(args));
            return rVal;
        })

    }

}