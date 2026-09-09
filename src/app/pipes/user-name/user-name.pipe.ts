import { Pipe, PipeTransform } from "@angular/core";
import { User } from "../../models";

@Pipe({
  name: 'fullname'
})
export class UserNamePipe implements PipeTransform {
  transform(user: User): string {
    return `${user.firstname} ${user.lastname}`;
  }
}
