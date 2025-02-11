"use client"

import { useState } from "react";
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";
import Image from "next/image";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY 
const events = [
    {
        id: 1,
        title: 'Event 1',
        time: '10:00 AM - 12:00 PM',
        description: 'This is a description of the event 1',
    },
    {
        id: 2,
        title: 'Event 2',
        time: '10:00 AM - 12:00 PM',
        description: 'This is a description of the event 2',
    },
    {
        id: 3,
        title: 'Event 3',
        time: '10:00 AM - 12:00 PM',
        description: 'This is a description of the event 3',
    },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(null);

  return (
    <div className='bg-white p-4 rounded-md'>
        <Calendar onChange={onChange} value={value} />
        <div className='flex items-center justify-between'>
            <h1 className="text-xl font-semibold my-4">Events</h1>
            <Image src="/moreDark.png" alt="" width={20} height={20}  />
        </div>
        <div className="flex flex-col gap-4">
            {events.map(event => (
                <div className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple' key={event.id}
            >
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold text-gray-500">{event.title}</h1>
                    <span className="text-gray-300 text-xs">{event.time}</span>
                </div>
                <p>{event.description}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default EventCalendar