import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { InternalCouponForm } from "./coupons/InternalCouponForm";
import { ExternalCouponForm } from "./coupons/ExternalCouponForm";
import { CustomerLoyalty } from "./coupons/CustomerLoyalty";
import { GiftCard } from "./coupons/GiftCard";
import { Cortesia } from "./cortesia/Cortesia";

export const EmployeeGifts = () => {

    const [tabValue, setTabValue] = useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    }

    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="px-4 pb-4 sm:px-6 flex flex-col gap-4">

            <Box sx={{ bgcolor: 'background.paper' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                >
                    <Tab label="Cupones Internos" />
                    <Tab label="Cupones Externos" />
                    <Tab label="Tarjeta de Lealtad" />
                    <Tab label="Gift Card" />
                    <Tab label="Cortesía" />
                </Tabs>
            </Box>


            <div className={`${tabValue !== 0 ? 'hidden' : ''} flex flex-col gap-4 w-full`} >

                <InternalCouponForm isLoading={isLoading} setIsLoading={setIsLoading} />

            </div>

            <div className={`${tabValue !== 1 ? 'hidden' : ''} flex flex-col gap-4 w-full`} >

                <ExternalCouponForm isLoading={isLoading} setIsLoading={setIsLoading} />

            </div>

            <div className={`${tabValue !== 2 ? 'hidden' : ''} flex flex-col gap-4 w-full`} >

                <CustomerLoyalty />

            </div>

            <div className={`${tabValue !== 3 ? 'hidden' : ''} flex flex-col gap-4 w-full`} >

                <GiftCard />

            </div>

            <div className={`${tabValue !== 4 ? 'hidden' : ''} flex flex-col gap-4 w-full`} >

                <Cortesia />

            </div>

        </div>
    )
}
