import ThemeSwitch from "./ThemeSwitch";

export default function NavBar() {
    return (
        <nav className="flex p-4 justify-end">
            <div className="flex w-6">
                <ThemeSwitch />
            </div>
        </nav>
    )
}
