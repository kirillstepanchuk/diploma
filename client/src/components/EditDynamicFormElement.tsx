import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FC, useEffect, useState } from "react";

interface Field {
  sysname: string,
  type: string,
  name: string,
  values: {
    value: string,
    name: string,
  }[],
}

interface DynamicFormElementProps {
  currValue: string,
  field: Field,
  onFieldChange: (fieldName: string, value: string) => void,
}

const EditDynamicFormElement: FC<DynamicFormElementProps> = ({ currValue, field, onFieldChange }) => {
  const [value, setValue] = useState<string>(currValue || "none");

  const onChange = (evt: SelectChangeEvent) => {
    setValue(evt.target.value as string);
    onFieldChange(field.sysname, evt.target.value);
  }

  useEffect(() => {
    setValue(currValue || "none");
  }, [currValue])


  return <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">{field.name}</InputLabel>
  <Select
  sx={{
    mb: 2,
  }}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={value!}
    label={field.name}
    onChange={onChange}
  >
    <MenuItem value={"none"}>Не выбрано</MenuItem>
    {field.values.map((value) => <MenuItem key={value.value} value={value.value}>{value.name}</MenuItem>)}
  </Select>
</FormControl>
}

export default EditDynamicFormElement;