import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";

type TrackedItem = {
    name: string;
    price: number;
};

const StyledInput = styled.input`
  width: 40%;
  padding: 10px;
  margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 5px;
  border: 1px solid #ddd; 
  font-size: 16px;

  &:focus {
    border-color: #9ecaed;
    box-shadow: 0 0 10px #9ecaed;
    outline: none;
  }
`;

const PriceTracker: React.FC = () => {
    const [url, setUrl] = useState("");
    const [response, setResponse] = useState("");
    const [trackedItems, setTrackedItems] = useState<TrackedItem[]>([]);

    const handleSubmit = async () => {
        try {
            const res = await fetch("http://localhost:5000/track-price", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({url}),
            });

            const data = await res.json();

            if (res.ok) {
                setResponse(data.message);
                await fetchTrackedItems();
            } else {
                throw new Error(data.error || "An error tracking the price.");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("An error fetching tracked items:", error.message);
            } else {
                console.error("An unexpected error occurred.");
            }
        }
    };

    const fetchTrackedItems = async () => {
        try {
            const res = await fetch("http://localhost:5000/price-updates");
            const data = await res.json();

            if (res.ok) {
                setTrackedItems(data.items);
            } else {
                throw new Error("Failed to fetch tracked items.");
            }
        } catch (error) {
            console.error("An error occurred while fetching tracked items:", error);
        }
    };

    useEffect(() => {
        fetchTrackedItems();
    }, []);


    return (
        <div>
            <h1 className={'hero-title'} color={'cyan'}>Amazon Price Tracker</h1>
            <StyledInput
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste the Amazon product URL here"
            />
            <button className={'hero-subtitle'} onClick={handleSubmit}>Track Price</button><br/>
            {response && <p>{response}</p>}

            <div>
                <h2>Tracked Items</h2>
                <div className="list-container">
                    {trackedItems.map((item, index) => (
                        <div key={index} className="list-item">
                            {item.name} - ${item.price}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PriceTracker;
