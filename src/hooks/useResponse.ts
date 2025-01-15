// hooks/useResponse.ts
import { useQuery } from "@tanstack/react-query";
import OpenAI from "openai";
import User from "../lib/types/User";
import { useState } from "react";

const useResponse = (users: User[]) => {
    const [streamedText, setStreamedText] = useState<string>('');

    const query = useQuery<string>({
        queryKey: ['response', users],
        queryFn: async () => {
            const openai = new OpenAI({
                apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
                dangerouslyAllowBrowser: true
            });

            setStreamedText(''); // Reset text at start of new stream

            const stream = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [{ role: 'user', content: `Give me a paragraph summarry of these json users ${JSON.stringify(users)} and then a list of all there user data in seperate paragraphs` }],
                stream: true,
            });

            let fullMessage = '';
            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || '';
                fullMessage += content;
                setStreamedText(fullMessage); // Update UI in real-time
            }

            return fullMessage;
        },
        enabled: !!users
    });

    return { ...query, streamedText };
};

export default useResponse;
