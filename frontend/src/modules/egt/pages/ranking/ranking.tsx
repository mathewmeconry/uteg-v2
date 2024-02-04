import { useTranslation } from "react-i18next";
import { PaperExtended } from "../../../../components/paperExtended";
import { useState } from "react";
import { Sex } from "../../../../__generated__/graphql";
import { Tab, Tabs } from "@mui/material";
import { RankingCategorySelection } from "../../components/ranking/rankingCategorySelection";

export function Ranking() {
    const {t} = useTranslation(['egt', 'common'])
    const [sex, setSex] = useState<Sex>('FEMALE');

    return (
        <PaperExtended title={t('ranking', {ns: 'egt'})}>
            <Tabs onChange={(_, v) => setSex(v)} value={sex} variant="fullWidth">
                <Tab key={'FEMALE'} value={'FEMALE'} label={t('female', {ns: 'common'})} />
                <Tab key={'MALE'} value={'MALE'} label={t('male', {ns: 'common'})} />
            </Tabs>
            <RankingCategorySelection sex={sex} />
        </PaperExtended>
    )
}