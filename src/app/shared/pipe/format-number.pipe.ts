import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatNumber",
})
export class FormatNumberPipe implements PipeTransform {
  transform(value: any): unknown {
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
