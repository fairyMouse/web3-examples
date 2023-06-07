import { TextField } from '@mui/material';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers';

import { Controller, useFormContext } from 'react-hook-form';

type Props = DateTimePickerProps<any, any> & {
  name: string;
};

const RHFDateTimePicker = (props: Props) => {
  const { name, ...others } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const value = field.value || props.value;
        return <DateTimePicker {...others} value={value} />;
      }}
    />
  );
};

export default RHFDateTimePicker;
