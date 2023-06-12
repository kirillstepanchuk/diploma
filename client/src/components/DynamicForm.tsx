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
  // category: string,
  categoryFields: any[] | null,
  onFieldChange: (fieldName: string, value: string) => void
}

const DynamicForm: FC<DynamicFormProps> = ({ categoryFields, onFieldChange }) => {
  // const [fields, setFields] = useState<any[] | null>(null)
  // const [category, setCategory] = useState<string>("none");
  // const [categoryFields, setCategoryFields] = useState<any[] | null>(null)


  // useEffect(() => {
  //   $api.get(`/categories`).then((res) => {
  //     setFields(res.data);
  //   }, (err) => {
  //     console.log('err: ', err);
  //   })
  // }, []);

  // const onCategoryChange = (evt: SelectChangeEvent) => {
  //   setCategory(evt.target.value as string);
  //   const catFields = fields?.find((field) => field.sysname === evt.target.value)?.fields;
  //   setCategoryFields(catFields || null)
  // }

  // if (!fields) {
  //   return null;
  // }
  
  return <>
    {/* <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Категория</InputLabel>
      <Select
      sx={{
        mb: 2,
      }}
        defaultValue="none"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={category!}
        label="Категория"
        
        onChange={onCategoryChange}
      >
        <MenuItem value={"none"}>Не выбрано</MenuItem>
        {fields.map((value) => <MenuItem key={value._id} value={value.sysname}>{value.name}</MenuItem>)}
      </Select>
    </FormControl> */}
    {
      categoryFields ? categoryFields?.map((field: Field) => <DynamicFormElement key={field.sysname} field={field} onFieldChange={onFieldChange}/>): null
    }
  </>
}

export default DynamicForm;