import { useState } from 'react';
import VerticalLinearStepper from '@/components/quotations/stepper';
import Layout from '@/layouts/Layout'
import { Box, Button, Grid } from '@mui/material';
import { SelectCustomerQuotation } from '@/components/quotations/SelectCustomerQuotation';
import { SelectProductQuotation } from '@/components/quotations/SelectProductQuotation';

export interface CustomerQuiotationType {
    id: string;
    legal_name: string;
    tax_id: string;
    zip: string;
    tax_system: string;
    preferred_cfdi: string;
}
const index = () => {

    const [Step, setStep] = useState<number>(0)
    const [customerInfo, setCustomerInfo] = useState({
        id: '',
        legal_name: '',
        tax_id: '',
        zip: '',
        tax_system: '',
        preferred_cfdi: ''
    })

    const [productInfo, setProductInfo] = useState({
        id: 0,
        name: '',
        description: '',
        price: 0,
        productKey: 0,
        unitKey: '',
        unitName: '',
    })

    const handleNext = () => {
        setStep((prevActiveStep) => prevActiveStep + 1);
        console.log('Customer info: ', customerInfo);

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
                    // md={2}
                    md={4}
                    lg={2}
                >
                    <VerticalLinearStepper activeStep={Step} />
                    <Box sx={{ mb: 2 }}>
                        <div>
                            <Button
                                variant="contained"
                                sx={{ mt: 1, mr: 1 }}
                                onClick={handleNext}
                                disabled={Step >= 3 || customerInfo.legal_name === ''}
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
                    // md={10}
                    md={8}
                    lg={10}
                >
                    <Box
                        component='div'
                        sx={{
                            backgroundColor: 'background.paper',
                            height: '500px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        {
                            Step === 0 && (

                                <SelectCustomerQuotation
                                    setCustomerInfo={setCustomerInfo}
                                    customerInfo={customerInfo}
                                />

                            )
                        }
                        {
                            Step === 1 && (
                                <SelectProductQuotation
                                    setProductInfo={setProductInfo}
                                    productInfo={productInfo}
                                />
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