import { FC } from "react";
import DynamicFormElement from "./DynamicFormElement";

interface Field {
  sysname: string,
  type: string,
  name: string,
  values: {
    value: string,
    name: string,
  }[],
}

interface DynamicFormProps {
  categoryFields: any[] | null,
  onFieldChange: (fieldName: string, value: string) => void
}

const DynamicForm: FC<DynamicFormProps> = ({ categoryFields, onFieldChange }) => {
  return <>
    {
      categoryFields ? categoryFields?.map((field: Field) => <DynamicFormElement key={field.sysname} field={field} onFieldChange={onFieldChange}/>): null
    }
  </>
}

export default DynamicForm;