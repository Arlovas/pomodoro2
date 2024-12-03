import LanguageSwitch from "./LanguageSwitch";
import Settings from "./Settings";
import ThemeSwitch from "./ThemeSwitch";

export default function NavBar({ locale }: { locale: string }) {
    return (
        <nav className="flex p-4 justify-end gap-4">
            <LanguageSwitch locale={locale} />
            <div className="flex w-6">
                <ThemeSwitch />
            </div>
            <Settings />
        </nav>
    )
}
