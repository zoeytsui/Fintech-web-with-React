import * as React from 'react';
import {
    // AppBar,
    Box,
    Button,
    // ButtonGroup,
    Container,
    CssBaseline,
    FormControl,
    FormControlLabel,
    GlobalStyles,
    MenuItem,
    IconButton,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    Link,
    TextField,
    Typography,
    // Toolbar,
    Radio,
    // Select,
    Stack,
    Step,
    Stepper,
    StepLabel,
    styled
} from '@mui/material';

import PropTypes from 'prop-types';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { makeStyles } from '@mui/styles'


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor:
                '#ff4713',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor:
                '#ff4713',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundColor:
            '#ff4713',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundColor:
            '#ff4713',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <img src="/images/step_icon1.png" alt="" width="38px" height="38px" />,
        2: <img src="/images/step_icon2.png" alt="" width="38px" height="38px" />,
        3: <img src="/images/step_icon3.png" alt="" width="38px" height="38px" />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const steps = ['Basic Information', 'Personal Information', 'Successful Account Opening'];


const countries = [
    {
        value: 'my',
        label: 'Malaysia',
    },
    {
        value: 'vn',
        label: 'Vietnam',
    },
];

const useStyles = makeStyles({
    Button: {
        textTransform: 'unset',
        backgroundColor: '#627792',
        "&:hover, &:focus": { backgroundColor: '#3A478F' },
    }
})

const Form = () => {
    const [values, setValues] = React.useState({
        country: 'my',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const classes = useStyles();

    const handleChange = (prop, event) => {
        // setValues({ ...values, [prop]: event.target.value });
    };


    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container maxWidth={'md'} sx={{ my: 1.5 }}>
            {/* step1 */}
            <Box component="form" sx={{ '& .MuiTextField-root': { my: 1 }, }} noValidate autoComplete="off">
                <TextField fullWidth id="outlined-select-country" select label="Country" value={values.country} onChange={handleChange} helperText="Please select your country">
                    {countries.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <TextField fullWidth sx={{ mr: 1 }} id="outlined-start-adornment" label="Mobile" InputProps={{ startAdornment: <InputAdornment position="start">+60</InputAdornment>, }} autoComplete="current-mobile" />
                    <TextField fullWidth sx={{ ml: 1 }} id="outlined-email-input" label="Email" type="Email" autoComplete="current-email" />
                </Box>

                <FormControl fullWidth sx={{ my: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                    {values.showPassword ? <img src="/images/eyesDown.png" alt="" width="42px" height="42px" /> : <img src="/images/openEyes.png" alt="" width="42px" height="42px" />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                <div>
                    <FormControlLabel checked value="sms" control={<Radio />} label="Send Via Sms" />
                </div>

                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <TextField sx={{ width: 3 / 4 }} id="outlined-code-input" label="Code" type="Code" autoComplete="current-code" />
                    <Button sx={{ width: 1 / 4 }} variant="contained" disableElevation className={classes.Button}>Get Code</Button>
                </Box>

                <Box sx={{ my: 1 }}>
                    <Link onClick={() => { <FormControlLabel checked value="sms" control={<Radio />} label="Send Via Sms" /> }}>
                        Friend invitation?
                    </Link>
                </Box>

            </Box>
            <Button fullWidth variant="contained" className={classes.Button}>Next</Button>
        </Container>
    );
};


const PageContainer = () => {
    return (
        <React.Fragment>

            {/* heading */}
            <Container maxWidth={'lg'} sx={{ my: 1.5 }}>
                <Typography variant="h4" align="center">
                    Register Real Account
                </Typography>

                <Typography variant="body1" align="center">
                    Expected to open an account in 1 minute
                </Typography>
            </Container>

            {/* stepper */}
            <Container maxWidth={'lg'} sx={{ my: 1.5 }}>
                <Stack sx={{ width: '100%' }} spacing={4}>
                    <Stepper alternativeLabel activeStep={0} connector={<ColorlibConnector />}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Stack>
            </Container>

            <Form />


            <Typography variant="body2" align="center">
                I confirm and agree to Disclamier and HXFX Global Client Agreement
            </Typography>
        </React.Fragment>
    );
}

export default function newAccount() {
    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <PageContainer />
        </React.Fragment>
    );
}