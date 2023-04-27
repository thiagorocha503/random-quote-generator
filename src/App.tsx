import { useState, useEffect } from "react";
import "./App.css";
const API_URL: string = "https://dummyjson.com/quotes/random";

export default function App() {
    // states
    const [quote, setQuote] = useState<{ text: string; author: string }>({
        text: "",
        author: "",
    });
    const [show, setShow] = useState<boolean>(false);

    // component did mounted
    useEffect(() => {
        fetchQuote();
    }, []);

    // fetch quote
    const fetchQuote = async () => {
        setShow(false);
        try {
            const res: Response = await fetch(API_URL);
            const data = await res.json();
            setQuote({
                text: data.quote,
                author: data.author,
            });
            setShow(true);
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
                return;
            }
            console.error(e);
        }
    };

    return (
        <div className="card p-2" id="quote-box">
            <div className="card-body">
                <p id="text" className={show ? "show " : "hide"}>
                    ❝{quote.text}❞
                </p>
                <p
                    className={`text-end ${show ? "show " : "hide"}`}
                    id="author"
                >
                    — {quote.author}
                </p>
                <div className=" mt-3 d-flex justify-content-end">
                    <a
                        className="btn btn-outline-primary me-3"
                        href={`https://twitter.com/intent/tweet?text=“${quote.text}” — ${quote.author}`}
                        target="_blank"
                        rel="noreferrer"
                        id="tweet-quote"
                    >
                        Tweet quote
                    </a>
                    <button
                        className="btn btn-primary"
                        id="new-quote"
                        onClick={() => fetchQuote()}
                    >
                        New quote
                    </button>
                </div>
            </div>
        </div>
    );
}
