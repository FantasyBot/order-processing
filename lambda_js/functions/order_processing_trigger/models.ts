import {
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  validate,
} from "class-validator";

// {
//   "costumer":{
//      "name":"guram svanidze",
//      "email":"guramisvanidze11@gmail.com",
//      "address":"mindeli street, 9b"
//   },
//   "payment_information":{
//      "card_number":"123456789",
//      "name":"GURAMI SVANIDZE"
//   },
//   "product":{
//      "name":"ram_240_gtx83",
//      "quantity":"1",
//      "price":"100$"
//   }
// }

export abstract class BaseValidator<T = unknown> {
  public abstract serialize(): Promise<T>;

  protected async validate() {
    const validationErrors = await validate(this);
    if (validationErrors.length) {
      throw validationErrors;
    }
  }
}

interface EventBodyModelType {
  id?: string;
  type?: string;
  value?: string;
}

export class EventBodyModel
  extends BaseValidator
  implements EventBodyModelType
{
  constructor({ id, type, value }: EventBodyModelType) {
    super();
    this.id = id;
    this.type = type;
    this.value = value;
  }

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  public id: EventBodyModelType["id"];

  @IsNotEmpty()
  @IsString()
  public type: EventBodyModelType["type"];

  @IsNotEmpty()
  @IsString()
  public value: EventBodyModelType["value"];

  public async serialize() {
    await this.validate();
    return {
      id: this.id!,
      type: this.type!,
      value: this.value!,
    };
  }
}
