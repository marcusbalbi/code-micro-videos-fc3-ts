
export type FieldsErrors = {
  [field: string]: string[];

}

export interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors;
  validatedData: PropsValidated | null;
  validate(data: any): boolean;

}