import { Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Information } from "../../components/profile/information";

export function Profile() {
    const {t} = useTranslation('common')
    const [selectedTab, setSelectedTab] = useState('information')

    function renderTab() {
        switch (selectedTab) {
            case 'information':
                return <Information />
            case 'security':
                return null
            default:
                return t('error')
        }
    }

    return (
        <Paper>
            <Tabs variant="fullWidth" value={selectedTab} onChange={(_, v) => setSelectedTab(v)}>
                <Tab key={'information'} value={'information'} label={t('information')} />
                <Tab key={'security'} value={'security'} label={t('security')} />
            </Tabs>
            {renderTab()}
        </Paper>
    )
}