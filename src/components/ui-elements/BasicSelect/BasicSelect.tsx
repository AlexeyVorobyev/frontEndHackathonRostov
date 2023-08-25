import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface item {
    name:string,
    value:string
}

export default function BasicSelect({items,idSelect, callback} : {items:Array<item>,idSelect:string, callback:Function}) {
    const [value, setValue] = React.useState(items[0].value);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
        callback(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 0 }}>
            <FormControl fullWidth>
                <Select
                    id={idSelect}
                    value={value}
                    onChange={handleChange}
                >
                    {items.map((item:item,index:number) => <MenuItem value={item.value} key={index}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    );
}