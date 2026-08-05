import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns'

import { Navbar } from '../';
import { localizer, getMessagesES } from '../../helpers';

interface CalendarEvent {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: {
    _id: string;
    name: string;
  };
}


const myEventsList: CalendarEvent[] = [{
  title: 'Cumpleaños del jefe',
  notes: 'Hay que comprar pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Angel'
  }
}];

export const CalendarPage = () => {

  const eventStyleGetter = (event: CalendarEvent, start: Date, end: Date, isSelected: boolean) => {
    console.log({ event, start, end, isSelected });

    const style: React.CSSProperties = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    };

    return {
      style
    }

  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
      />

    </>
  )
}
