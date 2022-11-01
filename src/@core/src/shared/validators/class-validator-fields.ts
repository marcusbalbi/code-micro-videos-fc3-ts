import { validateSync } from "class-validator";
import ValidatorFieldsInterface, { FieldsErrors } from "./validator-fields.interface";


export abstract class ClassValidatorField<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors = {};
  protected valid: boolean | undefined;

  validatedData: PropsValidated | null = null;
  validate(data: any): boolean {
    const errors = validateSync(data);
    if (errors.length) {
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints || {});
      }
      this.valid = false;
    } else {
      this.validatedData = data;
      this.valid = true;
    }
    return this.valid;
  }

  isValid(): boolean {
    if (this.valid === undefined) return false;
    return this.valid;
  }
    
  }