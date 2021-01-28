import React, { useState, useEffect } from 'react';
import AddPerson from './addPerson.jsx';
import QueueRow from './queueRow.jsx';

export default function App() {
    const [queues, setQueues] = useState([]);
    const [rows, setRows] = useState([]);

    const store = {
        queues: { get: () => queues, set: setQueues }
    };

    useEffect(() => {
        const newRows = [];
        let currentRow = []
        for (let i = 0; i < queues.length; i++) {
            if (currentRow.length === 3) {
                newRows.push(currentRow);
                currentRow = [];
            }
            currentRow.push(queues[i]);
        }
        if (currentRow.length > 0) newRows.push(currentRow);
        setRows(newRows);
    }, [queues]);

    useEffect(() => {
        // začetno stanje: dodamo eno demo osebo
        setQueues([{ name: 'Jože Pločnik', tasks: ['Špecerija', 'Odnesi smeti'] }]);
    }, []);

    console.log('render: App');

    return (
        <div>
            <div className="title">Listki opravil</div>
            <AddPerson currentPeople={queues} setPeople={setQueues} />
            <div className="queues-wrapper">
                {rows.map((row, idx) => <QueueRow key={`${idx}`} idx={idx} row={row} currentPeople={queues} setPeople={setQueues} />)}
            </div>
        </div>
    );
}

