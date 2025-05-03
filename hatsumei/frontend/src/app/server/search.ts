import { NextApiRequest, NextApiResponse } from 'next';
import { SearchResults } from "../../types/types"


interface FlaskApiResponse {
    results: SearchResults[];
    error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { query } = req.body;

        try {
            const response = await fetch('http://localhost:5000/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'backend APIエラー');
            }

            const data: FlaskApiResponse = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const filteredResults = data.results.filter(result => result.title.includes(query));

            res.status(200).json({ results: filteredResults });
        } catch (error: unknown) {
            console.error('Flask APIエラー:', error);
            const errorMessage = error instanceof Error ? error.message : 'Flask APIエラー';
            res.status(500).json({ error: errorMessage });
        }
    } else {
        res.status(405).end();
    }
}