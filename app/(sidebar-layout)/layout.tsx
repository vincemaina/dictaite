import VoiceNoteList from "../../components/voice-note-list";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen">
            <VoiceNoteList/>

            <main className="flex-auto p-20 overflow-y-scroll">
                {children}
            </main>
        </div>
    );
}
