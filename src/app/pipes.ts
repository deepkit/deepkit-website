import {Pipe, PipeTransform} from "@angular/core";
import {humanBytes} from "@deepkit/core";


@Pipe({name: 'fileSize'})
export class HumanFileSizePipe implements PipeTransform {
    transform(bytes: number, si: boolean = false): string {
        return humanBytes(bytes, si);
    }
}
