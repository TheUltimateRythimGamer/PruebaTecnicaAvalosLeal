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
            debugger
            let rVal = (val.id.toString().toLocaleLowerCase().includes(args.toLocaleLowerCase())) || (val.nombre.toLocaleLowerCase().includes(args.toLocaleLowerCase()));
            return rVal;
        })

    }

}