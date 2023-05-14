import React, { useCallback, useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import Main from './Main';

function Home() {
    const [days, setDays] = useState('90')
    const [data, setData] = useState({ unfiltered: [], datefiltered: [], filtered: [], user2filtered: [] });
    const [computed, setcomputed] = useState((new Date()).getTime())
    const [events, setEvents] = useState([]);
    const [showEvent, setshowEvent] = useState([])

    const [isStacked, setisStacked] = useState(false);
    const [stackBy, setstackBy] = useState({})
    const [isUser2, setisUser2] = useState(false)
    const [loading, setisLoading] = useState(false)
    const exportToCsv = useCallback(() => {
        setisLoading(true);
        const items = [...data.filtered]
        for (let i = 0; i < items.length; i++) {
            items[i] = Object.fromEntries(Object.entries(items[i]).filter(([key]) => {
                return !key.includes('start_date') && !key.includes('id') && !key.includes('data')
            }));
        }

        const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
        const header = Object.keys(items[0])
        let csv;
        if (isUser2) {
            let items2 = [...data.user2filtered];
            for (let i = 0; i < items2.length; i++) {
                items2[i] = Object.fromEntries(Object.entries(items2[i]).filter(([key]) => {
                    return !key.includes('start_date') && !key.includes('id') && !key.includes('data')
                }));
            }

            csv = [
                'User 1',
                header.join(','), // header row first
                ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')),
                '',
                'User 2',
                header.join(','), // header row first
                ...items2.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))


            ].join('\r\n')
        }
        else {

            csv = [
                header.join(','), // header row first
                ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))

            ].join('\r\n')
        }

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.csv";
        link.click();
        setisLoading(false);
    },
        [data],
    )

    const fetchData = useCallback(
        async () => {
            setisLoading(true)

            await fetch('chart-data-A01002.json', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(res => res.json()).then((data) => {

                setData((prev) => {
                    return { filtered: data[0].cb_json, unfiltered: data[0].cb_json, datefiltered: data[0].cb_json, user2filtered: data[0].cb_json }
                })
                let s = new Set()
                let temp = [...data[0].cb_json]
                let filtered = temp.filter((x) => {

                    return x.event_data != null
                });
                filtered.forEach(x => {
                    let y = JSON.parse(x.event_data);
                    s.add(y[0].event_name)
                })
                let dataEvents = Array.from(s);
                dataEvents.push('Home');
                dataEvents.sort();
                setEvents(dataEvents);
                setstackBy(prev => {
                    let tmp = {}
                    let keys = Object.keys(temp[0]).filter((key) => {
                        return !key.includes('start_date') && !key.includes('id') && !key.includes('data')
                    });
                    keys.forEach(key => {
                        if (!prev[key]) tmp[key] = false;
                    })
                    return { ...prev, ...tmp }
                })
            }).catch(console.log);
            setisLoading(false);
        },
        [],
    )

    useEffect(() => {

        fetchData()

    }, [computed])

    return (
        <>
            <div className='flex flex-row text-gray-700 text-sm'>

                <Sidebar
                    events={ events }
                    setEvents={ setEvents }
                    setData={ setData }
                    data={ data }
                    isUser2={ isUser2 }
                    setisUser2={ setisUser2 }
                    days={ days }
                    showEvent={ showEvent }
                    setshowEvent={ setshowEvent }
                    computed={ computed }
                    isStacked={ isStacked }
                    stackBy={ stackBy }
                    setstackBy={ setstackBy }
                />

                <Main
                    setData={ setData }
                    data={ data }
                    exportToCsv={ exportToCsv }
                    events={ events }
                    setDays={ setDays }
                    loading={ loading }
                    days={ days }
                    isUser2={ isUser2 }
                    setisUser2={ setisUser2 }
                    showEvent={ showEvent }
                    setshowEvent={ setshowEvent }
                    computed={ computed }
                    setcomputed={ setcomputed }
                    isStacked={ isStacked }
                    setisStacked={ setisStacked }
                    stackBy={ stackBy }
                />


            </div>
        </>
    )
}

export default Home