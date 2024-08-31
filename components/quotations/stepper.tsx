import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
    {
        label: 'Selecciona los datos de facturación de tu cliente',
        description: `Selecciona los datos de facturación de tu cliente, si no lo tienes registrado, puedes hacerlo en la sección de clientes.`,
    },
    {
        label: 'Selecciona los productos y la cantidad',
        description:
            'Selecciona los productos que deseas cotizar y la cantidad de cada uno de ellos.',
    },
    {
        label: 'Revisa la cotización',
        description: `Revisa la cotización antes de enviarla, una vez enviada no podrá ser modificada.`,
    },
];

export default function VerticalLinearStepper({ activeStep }: { activeStep: number }) {
    // const [activeStep, setActiveStep] = React.useState(0);

    const handleReset = () => {
        activeStep = 0;
    };

    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical"  >
                {steps.map((step, index) => (
                    <Step key={step.label} >
                        <StepLabel
                        optional={
                            index === 2 ? (
                                <Typography variant="caption">Paso final</Typography>
                            ) : null
                        }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Paper
                                square
                                elevation={0}
                                sx={{ p: 3 }}
                            >
                                <Typography>{step.description}</Typography>
                            </Paper>

                        </StepContent>

                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    );
}