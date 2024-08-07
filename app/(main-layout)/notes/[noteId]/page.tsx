import PencilIcon from "../../../../components/icons/pencil";
import TrashIcon from "../../../../components/icons/trash";
import Label from "../../../../components/label";
import Transcription from "../../../../components/transcription";

export default function Page() {
    return (
        <div className="max-w-[1100px] mx-auto">
            <div className="mb-7 flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?img=2" alt="Image of person" className="h-10 aspect-square object-cover rounded-full"/>
                <div>
                    <h3 className="text-sm dark:text-white font-medium mb-px">John Doe</h3>
                    <p className="text-xs text-neutral-400">
                        {new Date().toDateString()}, {new Date().toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric"})}
                    </p>
                </div>
            </div>
            <div className="flex gap-5 justify-between items-start">
                <div className="flex flex-col gap-3">
                    <h2 className="text-3xl dark:text-white font-medium">Testing Voice Transcription</h2>
                    <div className="flex flex-wrap gap-2">
                        <Label>AI</Label>
                        <Label>Transcription</Label>
                        <Label>Machine Learning</Label>
                    </div>
                </div>

                <div className="fill-neutral-500 dark:fill-neutral-400 flex gap-2 mt-3">
                    <div className="bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-emerald-800 dark:hover:fill-emerald-50 p-3 rounded-full aspect-square">
                        <PencilIcon/>
                    </div>
                    <div className="bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-rose-800 dark:hover:fill-rose-50 p-3 rounded-full aspect-square">
                        <TrashIcon/>
                    </div>
                </div>
            </div>
            <div className="flex gap-16 mt-12">
                <Transcription
                    lines={{
                        1: {
                            text: "I'm now testing out my new and improved version of this dictation app.",
                            start: 0,
                            end: 5,
                            speaker: "User"
                        },
                        2: {
                            text: "The idea is that you can record voice notes and just jot down your thoughts.",
                            start: 5,
                            end: 10,
                            speaker: "User"
                        },
                        3: {
                            text: "For example, if you have an idea for a project, you can just talk it out loud.",
                            start: 10,
                            end: 15,
                            speaker: "User"
                        },
                        4: {
                            text: "And then what the app will do is it will use AI to transcribe your voice note, and then to pick out key phrases and to label it and organize it for you so that you don't have to worry about it.",
                            start: 15,
                            end: 20,
                            speaker: "User"
                        },
                        5: {
                            text: "\n\nI'm now testing out my new and improved version of this dictation app.",
                            start: 0,
                            end: 5,
                            speaker: "User"
                        },
                        6: {
                            text: "The idea is that you can record voice notes and just jot down your thoughts.",
                            start: 5,
                            end: 10,
                            speaker: "User"
                        },
                        7: {
                            text: "For example, if you have an idea for a project, you can just talk it out loud.",
                            start: 10,
                            end: 15,
                            speaker: "User"
                        },
                        8: {
                            text: "And then what the app will do is it will use AI to transcribe your voice note, and then to pick out key phrases and to label it and organize it for you so that you don't have to worry about it.",
                            start: 15,
                            end: 20,
                            speaker: "User"
                        },
                    }}
                />

                <div className="w-full max-w-sm bg-neutral-200 dark:bg-neutral-800 p-7 rounded-xl text-sm">
                    <h4 className="font-medium text-base mb-7">Key points</h4>
                    <ul className="list-outside ml-4 list-disc space-y-4 font-light text-netural-600 dark:text-neutral-400">
                        <li className="list-item">Testing a new and improved <span className="text-blue-500 dark:text-blue-200">dictation</span> app.</li>
                        <li className="list-item">The app allows recording of voice notes to jot down thoughts.</li>
                        <li className="list-item">Users can speak their project ideas out loud.</li>
                        <li className="list-item">The app <span className="text-blue-500 dark:text-blue-200">uses AI</span> to transcribe the voice notes.</li>
                        <li className="list-item">It picks out key phrases and labels them.</li>
                        <li className="list-item">The app organizes the notes for the user.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}