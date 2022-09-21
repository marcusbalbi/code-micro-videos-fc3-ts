import { validateSync } from "class-validator";
import ValidatorFieldsInterface, { FieldsErrors } from "./validator-fields.interface";


export class ClassValidatorField<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors = {};
  validatedData: PropsValidated | null = null;
  validate(data: any): boolean {
    const errors = validateSync(data);
    if (errors.length) {
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints || {});
      }
      return false;
    } else {
      this.validatedData = data;
      return true;
    }
  }
    
  }