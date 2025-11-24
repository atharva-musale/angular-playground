import { Pipe } from "@angular/core";
import { User } from "../../models";

@Pipe({
  name: 'fullname'
})
export class UserNamePipe {
  transform(user: User): string {
    return `${user.firstname} ${user.lastname}`;
  }
}
