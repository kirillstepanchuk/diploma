import { FC } from "react";
import EditDynamicFormElement from "./EditDynamicFormElement";

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
  values: any[] | null,
  categoryFields: any[] | null,
  onFieldChange: (fieldName: string, value: string) => void
}

const EditDynamicForm: FC<DynamicFormProps> = ({values, categoryFields, onFieldChange }) => {
  // console.log('values: ', values);


  return <>
    {
      categoryFields ? categoryFields?.map((field: Field) => (
        <EditDynamicFormElement
          key={field.sysname}
          // @ts-ignore
          currValue={values?.[field.sysname]}
          field={field}
          onFieldChange={onFieldChange}
        />
      )): null
    }
  </>
}

export default EditDynamicForm;