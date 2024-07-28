import dynamic from 'next/dynamic';

const Recorder = dynamic(() => import('../components/recorder'), { ssr: false });

export default function Home() {
    return (
        <div>
            <h1>Voice Notes</h1>
            <Recorder />
        </div>
    );
}
