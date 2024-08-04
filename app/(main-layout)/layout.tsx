export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex-auto p-20 overflow-y-scroll">
            {children}
        </main>
    );
}
