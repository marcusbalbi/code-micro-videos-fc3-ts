
export type FieldsErrors = {
  [field: string]: string[];

}

export default interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors;
  validatedData: PropsValidated | null;
  validate(data: any): boolean;

}