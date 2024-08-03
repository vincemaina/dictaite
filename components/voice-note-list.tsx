import SearchIcon from "./icons/search";
import VoiceNote from "./voice-note";

export default function VoiceNoteList() {
    return (
        <div className="h-screen w-96 sticky top-0 bg-neutral-900 p-6 flex flex-col">

            <div className="fill-gray-300 flex gap-3 items-center mb-5 px-1">
                <SearchIcon/>
                <input type="search"
                    name="input-search"
                    id="input-search"
                    className="bg-transparent w-full placeholder:text-sm"
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

            <div className="mt-auto flex items-center gap-2 text-red-200">
                <div className="h-8 bg-red-600 aspect-square rounded-full flex">
                    <div className="h-2 bg-red-200 aspect-square rounded-full m-auto"/>
                </div>

                + New recording
            </div>
        </div>
    )
}