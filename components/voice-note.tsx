import PlayIcon from "./icons/play";

interface Props {
    title: string;
    date: Date;
    seconds: number;
    tags: string[];
}

export default function VoiceNote(props: Props) {

    const minutes = Math.floor(props.seconds / 60);
    const seconds = (props.seconds % 60).toFixed(0).padStart(2, "0");

    return (
        <div className="bg-neutral-800 w-full p-3 rounded-lg border-b border-b-neutral-900 truncate">
            <div className="flex gap-5 justify-between items-center truncate">
                <div className="truncate">
                    <h4 className="text-sm text-white mb-1 truncate"
                        title={props.title}
                    >
                        {props.title}
                    </h4>
                    <p className="text-xs text-neutral-400">{props.date.toDateString()}</p>
                </div>

                <button className="fill-neutral-400" title="Play">
                    <PlayIcon/>
                </button>
            </div>

            <div className="flex items-center gap-5 text-xs mt-1.5">
                <div className="h-1  bg-neutral-900 relative rounded overflow-hidden flex-auto">
                    <div className="absolute bg-gradient-to-r from-cyan-400 to-blue-600 inset-0 w-1/2 rounded-r">
                        <div className="relative h-full aspect-square float-end bg-white rounded-full"/>
                    </div>
                </div>

                <span className="text-neutral-400">{minutes}:{seconds}</span>
            </div>
        </div>
    );
}