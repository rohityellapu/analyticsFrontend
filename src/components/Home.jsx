import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import Main from './Main';
import axios from 'axios'

function Home() {
    let userEvents = {
        user1: {
            selected: true,
            events: {
                'Home': false,
                'Cart': false,
                "Dr.Jrks 777 Oil 200ml": false,
                'Eye Aids': false,
                "Whey Protein": false,
                "Workout Essentials": false,
                "Bottles": false,
                "Hair Care": false,
                "FACE WASH": false,
                "Beauty": false,
                "nutrition": false

            }
        }, user2: {
            selected: false,
            events: {
                'Home': false,
                'Cart': false,
                "Dr.Jrks 777 Oil 200ml": false,
                'Eye Aids': false,
                "Whey Protein": false,
                "Workout Essentials": false,
                "Bottles": false,
                "Hair Care": false,
                "FACE WASH": false,
                "Beauty": false,
                "nutrition": false

            }
        }
    }
    const [api, setApi] = useState('http://localhost:3005?past=30')
    const [data, setData] = useState({ unfiltered: [], filtered: [] });
    const [events, setEvents] = useState(
        {
            'Home': false,
            'Cart': false,
            "Dr.Jrks 777 Oil 200ml": false,
            'Eye Aids': false,
            "Whey Protein": false,
            "Workout Essentials": false,
            "Bottles": false,
            "Hair Care": false,
            "FACE WASH": false,
            "Beauty": false,
            "nutrition": false

        });
    const [loading, setisLoading] = useState(false)
    function exportToCsv() {

        const items = data.filtered
        const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
        const header = Object.keys(items[0])
        const csv = [
            header.join(','), // header row first
            ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        ].join('\r\n')

        console.log(csv)

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.csv";
        link.click();
    }
    async function fetchData() {
        setisLoading(true)
        axios.get(api).then((res) => {
            console.log(res.data.data);
            setData((prev) => {
                return { filtered: [...res.data.data], unfiltered: [...res.data.data] }
            })
        }).catch(console.log)

        setisLoading(false);

    }
    useEffect(() => {

        fetchData()

    }, [api])
    return (
        <>
            <div className='flex flex-row text-blue-900'>

                <Sidebar events={ events } setEvents={ setEvents } setData={ setData } data={ data } />

                <Main data={ data } exportToCsv={ exportToCsv } events={ events } setApi={ setApi } loading={ loading } api={ api } />


            </div>
        </>
    )
}

export default Home