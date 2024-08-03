import { useState } from 'react';
import VerticalLinearStepper from '@/components/quotations/stepper';
import Layout from '@/layouts/Layout'
import { Box, Button, Grid } from '@mui/material';
import { SelectCustomerQuotation } from '@/components/quotations/SelectCustomerQuotation';
const index = () => {

    const [Step, setStep] = useState<number>(0)

    const handleNext = () => {
        setStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => {
        setStep((prevActiveStep) => prevActiveStep - 1);
    }



    return (
        <Layout
            title='Cotizaciones'
        >
            <Grid
                container
                alignItems={'center'}
                justifyContent={'center'}
                width='100%'
                height='95vh'
                sx={{
                    // backgroundColor: 'background.paper'
                }}
            >
                <Grid
                    item
                    md={2}
                >
                    <VerticalLinearStepper activeStep={Step} />
                    <Box sx={{ mb: 2 }}>
                        <div>
                            <Button
                                variant="contained"
                                sx={{ mt: 1, mr: 1 }}
                                onClick={handleNext}
                                disabled={Step >= 3}
                            >
                                Siguiente
                            </Button>
                            <Button
                                sx={{ mt: 1, mr: 1 }}
                                onClick={handleBack}
                                disabled={Step <= 0}
                            >
                                Atras
                            </Button>

                        </div>
                    </Box>
                </Grid>
                <Grid
                    item
                    md={10}
                >
                    <Box
                        component='div'
                    >
                        {
                            Step === 0 && (
                                <Box>
                                    <h1>Step 1</h1>
                                    <SelectCustomerQuotation />
                                </Box>
                            )
                        }
                        {
                            Step === 1 && (
                                <Box>
                                    <h1>Step 2</h1>
                                </Box>
                            )
                        }
                        {
                            Step === 2 && (
                                <Box>
                                    <h1>Step 3</h1>
                                </Box>
                            )

                        }

                    </Box>

                </Grid>
            </Grid>

        </Layout>
    )
}

export default index;