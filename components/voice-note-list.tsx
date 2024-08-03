import VoiceNote from "./voice-note";

export default function VoiceNoteList() {
    return (
        <div className="h-screen w-96 sticky top-0 bg-neutral-900 p-4 flex flex-col gap-3">
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
    )
}