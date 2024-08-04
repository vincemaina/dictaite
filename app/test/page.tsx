import PencilIcon from "../../components/icons/pencil";
import TrashIcon from "../../components/icons/trash";
import Label from "../../components/label";
import VoiceNote from "../../components/voice-note";

export default function Page() {
    return (
        <>
            <div className="mb-7 flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?img=2" alt="Image of person" className="h-10 aspect-square object-cover rounded-full"/>
                <div>
                    <h3 className="text-sm text-white font-medium">John Doe</h3>
                    <p className="text-xs text-neutral-400">
                        {new Date().toDateString()}, {new Date().toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric"})}
                    </p>
                </div>
            </div>
            <div className="flex gap-5 justify-between items-start">
                <div className="flex flex-col gap-3">
                    <h2 className="text-3xl text-white font-medium">Testing Voice Transcription with Pookie</h2>
                    <div className="flex flex-wrap gap-2">
                        <Label>AI</Label>
                        <Label>Transcription</Label>
                        <Label>Machine Learning</Label>
                    </div>
                </div>

                <div className="fill-neutral-400 flex gap-2 mt-3">
                    <div className="bg-neutral-800 hover:bg-emerald-800 hover:fill-emerald-50 p-3 rounded-full aspect-square">
                        <PencilIcon/>
                    </div>
                    <div className="bg-neutral-800 hover:bg-rose-800 hover:fill-rose-50 p-3 rounded-full aspect-square">
                        <TrashIcon/>
                    </div>
                </div>
            </div>
            <div className="flex gap-16 mt-12">
                <div className="w-full">
                    {/* <h4 className="mb-7">Transcription</h4> */}
                    <p style={{lineHeight: "1.5"}} className="text-lg text-neutral-200 font-light">
                        <span className="opacity-40">I'm now testing out my new and improved version of this dictation app.</span>
                        <span className="bg-gradient-to-r from-violet-50 to-blue-50 bg-clip-text text-transparent">
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
                    <h4 className="font-medium text-base mb-7">Key points</h4>
                    <ul className="list-outside ml-4 list-disc space-y-4 font-light text-neutral-400">
                        <li className="list-item">Testing a new and improved <span className="text-violet-200">dictation</span> app.</li>
                        <li className="list-item">The app allows recording of voice notes to jot down thoughts.</li>
                        <li className="list-item">Users can speak their project ideas out loud.</li>
                        <li className="list-item">The app <span className="text-violet-200">uses AI</span> to transcribe the voice notes.</li>
                        <li className="list-item">It picks out key phrases and labels them.</li>
                        <li className="list-item">The app organizes the notes for the user.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}