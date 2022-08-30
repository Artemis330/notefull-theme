import tw from "@styles/tailwind.util"
import Navigation from "./Navigation"
import NoteBackground from "./NoteBackground"

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main
            className={`${tw.layout} flex flex-col items-center justify-center p-8 mx-auto`}
        >
            <div className="flex flex-col items-start justify-start w-full h-full min-h-screen gap-4">
                {children}
            </div>
            <Navigation />
            <NoteBackground rectSize={150} />
        </main>
    )
}

export default Layout
