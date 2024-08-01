const natural = require('natural');
const sw = require('stopword');

function get_keywords(text, num_keywords=5) {
    
    // Tokenize and remove stop words
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(text);
    const filteredTokens = sw.removeStopwords(tokens);

    // Create a frequency map
    const frequencyMap = {};
    filteredTokens.forEach((word) => {
        if (frequencyMap[word]) {
            frequencyMap[word]++;
        } else {
            frequencyMap[word] = 1;
        }
    });

    // Sort the words by frequency and get the top num_keywords
    const sortedWords = Object.keys(frequencyMap).sort((a, b) => frequencyMap[b] - frequencyMap[a]);
    const keywords = sortedWords.filter(i => i.length > 3).slice(0, num_keywords);

    return keywords;
}

const text = `
Okay, so I’ve been thinking about this new project idea. It's sort of like a cross between a social media platform and a productivity tool. The basic concept is to help people organize their thoughts, tasks, and projects all in one place, but with a social element where they can share progress and get feedback from their friends or colleagues.

I was thinking the app could have different sections for different types of content. Like, you could have a section for quick notes, another for longer journal entries, and another for task lists. There could be a calendar integration too, so you can see all your tasks and deadlines in one place.

And then, the social aspect would come in with sharing features. Maybe you could share specific notes or tasks with friends, or even create group projects where everyone can contribute their own notes and tasks. I think it would be really cool to have some sort of collaboration tools, like shared task lists and the ability to comment on each other’s notes.

Oh, and voice input would be a great feature too. Sometimes it’s just easier to talk things out rather than type them. So, there could be a voice recording tool built into the app, where you can just hit a button and start talking. The app would then transcribe your voice into text and organize it into the right section automatically.

For the design, I want it to be really clean and user-friendly. Nothing too cluttered or complicated. Maybe a simple color scheme with lots of white space. I think the key is to make it as intuitive as possible, so people can just start using it right away without a steep learning curve.

In terms of monetization, we could go with a freemium model. Basic features would be free, but we could charge for premium features like additional storage, advanced collaboration tools, and maybe even some AI-driven insights or suggestions based on your notes and tasks.

Okay, I think that’s it for now. I’ll need to start sketching out some wireframes and maybe do some market research to see if there’s a demand for this kind of app. But overall, I think it has a lot of potential. I'll definitely need to find a good team to help bring this idea to life. Alright, that’s all for today.
`

console.log(get_keywords(text, 10));