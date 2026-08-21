import { useEffect, useState } from 'react';
import { Calendar, type View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvents, CalendarModal, FabAddNew, FabDelete, Navbar } from '../';

import { localizer, getMessagesES } from '../../helpers';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';
import type { GetCalendarEvents } from '../../interfaces/GetCalendarEvents.interface';


export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState<View>(localStorage.getItem('lastView') as View || 'week');

  const eventStyleGetter = (event: GetCalendarEvents, start: Date, end: Date, isSelected: boolean) => {

    const isMyEvent = (user?.id === event.user._id);

    const style: React.CSSProperties = {
      backgroundColor: isMyEvent ? '#347cf7' : '#465660',
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

  const onSelect = (event: GetCalendarEvents) => {

    setActiveEvent(event);
  };

  const onViewChanged = (event: View) => {

    localStorage.setItem('lastView', event);

    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, [])

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
          event: CalendarEvents
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />

    </>
  )
}
