import PencilIcon from "../../components/icons/pencil";
import TrashIcon from "../../components/icons/trash";
import Label from "../../components/label";
import VoiceNote from "../../components/voice-note";

export default function Page() {
    return (
        <>
            <div>
                <div className="flex gap-5 justify-between">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-3xl font-semibold">Testing Voice Transcription with Pookie</h2>
                        <div className="flex flex-wrap gap-2">
                            <Label>AI</Label>
                            <Label>Transcription</Label>
                            <Label>Machine Learning</Label>
                        </div>
                    </div>

                    <div className="fill-neutral-400 flex gap-5 mt-3">
                        <PencilIcon/>
                        <TrashIcon/>
                    </div>
                </div>
            </div>
            <div className="flex gap-16 mt-12">
                <div className="w-full">
                    {/* <h4 className="mb-7">Transcription</h4> */}
                    <p style={{lineHeight: "1.5"}} className="text-xl text-neutral-200 font-light">
                        <span className="opacity-40">I'm now testing out my new and improved version of this dictation app.</span>
                        <span className="bg-gradient-to-r from-blue-200 to-fuchsia-50 bg-clip-text text-transparent">
                            The idea is that you can record voice notes and just jot down your thoughts.
                        </span>
                        <span className="opacity-10">
                        For example, if you have an idea for a project, you can just talk it out loud. And then what the app will do is it will use AI to transcribe your voice note, and then to pick out key phrases and to label it and organize it for you so that you don't have to worry about it.
                        </span>
                        <br />
                        <br />
                        <span className="mt-7 opacity-10">
                            I'm now testing out my new and improved version of this dictation app.
                            The idea is that you can record voice notes and just jot down your thoughts.
                            For example, if you have an idea for a project, you can just talk it out loud. And then what the app will do is it will use AI to transcribe your voice note, and then to pick out key phrases and to label it and organize it for you so that you don't have to worry about it.
                        </span>
                    </p>
                </div>

                <div className="w-full max-w-sm bg-neutral-800 p-7 rounded-xl text-sm">
                    <h4 className="font-medium mb-7">Key points</h4>
                    <ul className="list-outside ml-4 list-disc space-y-4 font-light text-neutral-400">
                        <li className="list-item">Testing a new and improved dictation app.</li>
                        <li className="list-item">The app allows recording of voice notes to jot down thoughts.</li>
                        <li className="list-item">Users can speak their project ideas out loud.</li>
                        <li className="list-item">The app uses AI to transcribe the voice notes.</li>
                        <li className="list-item">It picks out key phrases and labels them.</li>
                        <li className="list-item">The app organizes the notes for the user.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}