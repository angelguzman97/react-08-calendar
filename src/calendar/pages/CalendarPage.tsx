import { Calendar, type View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns'

import { CalendarEvent, CalendarModal, Navbar } from '../';
import { localizer, getMessagesES } from '../../helpers';
import type { CalendarEventProps } from '../../interfaces';
import { useState } from 'react';
import { useUiStore } from '../../hooks';


const events: CalendarEventProps[] = [{
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

  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState<View>(localStorage.getItem('lastView') as View || 'week');

  const eventStyleGetter = (event: CalendarEventProps, start: Date, end: Date, isSelected: boolean) => {

    const style: React.CSSProperties = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    };

    return {
      style
    }
  };

  const onDoubleClick = () => {
    // console.log({ onDoubleClick: event });
    openDateModal();
  };

  const onSelect = (event: CalendarEventProps) => {
    console.log({ onSelect: event });

  };

  const onViewChanged = (event: View) => {

    console.log(lastView);

    localStorage.setItem('lastView', event);

    setLastView(event);
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
    </>
  )
}
