import SearchIcon from "./icons/search";
import VoiceNote from "./voice-note";

export default function VoiceNoteList() {
    return (
        <div className="h-screen w-[370px] sticky top-0 bg-neutral-950 px-6 py-8 flex flex-col">

            <div className="fill-gray-300 flex gap-3 items-center mb-5 px-3">
                <SearchIcon/>
                <input type="search"
                    name="input-search"
                    id="input-search"
                    className="bg-transparent w-full placeholder:text-sm outline-none border-none"
                    placeholder="Search recordings"
                />
            </div>

            <div className="flex flex-col gap-3">
                <VoiceNote
                    title="Testing Voice Transcription with Pookie After Recent Updates"
                    date={new Date()}
                    seconds={120}
                    tags={["tag1", "tag2"]}
                />
                <VoiceNote
                    title="Testing Voice Transcription with Pookie After Recent Updates"
                    date={new Date()}
                    seconds={10}
                    tags={["tag1", "tag2"]}
                />
                <VoiceNote
                    title="Testing Voice Transcription with Pookie After Recent Updates"
                    date={new Date()}
                    seconds={10}
                    tags={["tag1", "tag2"]}
                />
            </div>

            <div className="mt-auto flex items-center px-3 gap-3 border-t border-t-neutral-900 pt-5 text-rose-200 text-sm font-medium">
                <div className="h-6 bg-rose-600 aspect-square rounded-full flex">
                    <div className="h-2 bg-rose-200 aspect-square rounded-full m-auto"/>
                </div>

                New recording
            </div>
        </div>
    )
}