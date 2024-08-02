# Project Report

## Brief

Build a voice note app for quickly verbalising ideas and thinking out loud.

The idea is was that using AI, these voice notes can be transcribed, summarised, labelled and sorted into a helpful folder system.

So that it is easy to recover these thoughts again later on.


## Challenges

### 1. Accuracy of transcriptions

Initially I was transcribing audio recordings using the Wav2Vec model on hugging face.

If you were very articulate with your speaking, you could get reasonably acceptable transcriptions from this. However the model struggled with technical terms (e.g. MP3 being transcribed as "EMPY THREE"), and it did not seem able to deduce what a word was from the context of the sentence. Furthermore, it did not make any attempts to guess at what the punctation should be.


### 2. Difficulty hosting LLMs

For this project, . Most of these LLMs were too large, and were hitting the limits imposed by the low level tiers on Heroku and Vercel.


### 3. Slow start up time on serverless infrastructures




### Tools and skills learned

- Using **OpenAI** models (used the Whisper speech-to-text model for transcribing recordings)
- Using pre-trained models on hugging face library