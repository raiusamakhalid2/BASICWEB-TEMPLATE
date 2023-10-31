export class CreateUserDto {
  readonly email        : string;
  readonly phone        : string[];
  readonly password     : string;
  readonly isAdmin      : boolean;
  readonly isVarified   : boolean;
//   readonly profile: {
//     readonly gender: string;
//     readonly picture: string;
//   };
}
