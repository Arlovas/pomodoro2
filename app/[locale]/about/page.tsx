import { useTranslations } from "next-intl";

export default function About() {

    const t = useTranslations('about');

    return (
        <div>
            <h1>{t('about')}</h1>
        </div>
    )
}