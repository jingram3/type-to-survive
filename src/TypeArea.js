import * as React from "react";
import './TypeArea.css';

function getStyledText(text, currentIndex) {
    return [...text].map((char, i) =>
        <span key={i} className={i <= currentIndex - 1 ? 'completed' : ''}>{char}</span>
    );
}

export function TypeArea(props) {
    const {useState} = React;

    const [currentIndex, setCurrentIndex] = useState(0);

    return <div>
        <div>{getStyledText(props.text, currentIndex)}</div>
        <div>
            <input
                type='text'
                data-testid="text-input"
                onChange={(e) => {
                    if (e.target.value[e.target.value.length - 1] === props.text[currentIndex]) {
                        setCurrentIndex(currentIndex + 1);
                    }
                    e.target.value = e.target.value[e.target.value.length - 1] || "";
                }}
            />
        </div>
    </div>;
}
