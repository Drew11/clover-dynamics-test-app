import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
}));

export default function SimpleSelect(props) {

    const {name, callback, activeQuery, options } = props;
    const classes = useStyles();

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">{name}</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={activeQuery}
                    onChange={callback}
                    label={name}
                >
                    <MenuItem value="">
                        <em>{name === 'Rover'? 'None': 'All'}</em>
                    </MenuItem>
                    {
                        options.map(option=>
                            <MenuItem value={option.toLocaleLowerCase()}>{option}</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        </div>
    );
}