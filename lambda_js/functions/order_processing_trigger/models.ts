import {
  IsObject,
  IsString,
  ValidateNested,
} from "class-validator";

import { BaseValidator } from "@fantasybot/order-processing-lib/lib/shared/validator/base";

interface EventBodyCostumerModelType {
  user_name: string;
  email: string;
  address: string;
}

interface EventBodyPaymentInformationModelType {
  card_number: string;
  card_owner: string;
}

interface EventBodyProductModelType {
  product_name: string;
  quantity: string;
}
interface EventBodyModelType {
  costumer: EventBodyCostumerModelType;
  payment_information: EventBodyPaymentInformationModelType;
  product: EventBodyProductModelType;
}

export class EventBodyCostumerModel implements EventBodyCostumerModelType {
  constructor({ user_name, email, address }: EventBodyCostumerModelType) {
    this.user_name = user_name;
    this.email = email;
    this.address = address;
  }

  @IsString()
  public user_name: EventBodyCostumerModelType["user_name"];

  @IsString()
  public email: EventBodyCostumerModelType["email"];

  @IsString()
  public address: EventBodyCostumerModelType["address"];
}

export class EventBodyPaymentInformationModel implements EventBodyPaymentInformationModelType {
  constructor({  card_number, card_owner }: EventBodyPaymentInformationModelType) {
    this.card_number = card_number;
    this.card_owner= card_owner;
  }

  @IsString()
  public card_number: EventBodyPaymentInformationModelType["card_number"];

  @IsString()
  public card_owner: EventBodyPaymentInformationModelType["card_owner"];
}

export class EventBodyProductModel implements EventBodyProductModelType {
  constructor({ product_name, quantity }: EventBodyProductModelType) {
    this.product_name = product_name;
    this.quantity = quantity;
  }

  @IsString()
  public product_name: EventBodyProductModelType["product_name"];

  @IsString()
  public quantity: EventBodyProductModelType["quantity"];
}

export class EventBodyModel extends BaseValidator {
  constructor({ costumer, payment_information, product }: EventBodyModelType) {
    super();

    this.costumer = new EventBodyCostumerModel(costumer);
    this.payment_information = new EventBodyPaymentInformationModel(payment_information);
    this.product = new EventBodyProductModel(product);
  }

  
  @IsObject()
  @ValidateNested()
  public costumer: EventBodyModelType["costumer"];

  @IsObject()
  @ValidateNested()
  public payment_information: EventBodyModelType["payment_information"];

  @IsObject()
  @ValidateNested()
  public product: EventBodyModelType["product"];

  public async serialize() {
    await this.validate();
    return {
      costumer: this.costumer!,
      payment_information: this.payment_information!,
      product: this.product!,
    };
  }
}
