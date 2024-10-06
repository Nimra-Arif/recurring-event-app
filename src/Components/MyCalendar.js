import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RRule } from 'rrule';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import EventModal from './EventModal';


const DragAndDropCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const userTimeZone = moment.tz.guess(); 

  
  const initialRule = new RRule({
    freq: RRule.WEEKLY,
    interval: 1,
    byweekday: [RRule.MO, RRule.WE],
    dtstart: new Date(2024, 9, 1, 10, 30),
    until: new Date(2024, 9, 15),
  });

  const initialRecurringDates = initialRule.all(); 
  const initialEvents = initialRecurringDates.map((date) => ({
    title: 'Recurring Event',
    start: moment(date).tz(userTimeZone).toDate(),
    end: moment(date).tz(userTimeZone).add(1, 'hour').toDate(),
  }));


  const [events, setEvents] = useState(initialEvents);
  const [isFormOpen, setFormOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: null, end: null, freq: 'WEEKLY' });


  const handleEventResize = (resizeType, { event, start, end }) => {
    const updatedEvents = events.map((existingEvent) =>
      existingEvent === event ? { ...event, start, end } : existingEvent
    );
    setEvents(updatedEvents);
  };


  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map((existingEvent) =>
      existingEvent === event ? { ...event, start, end } : existingEvent
    );
    setEvents(updatedEvents);
  };


  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ ...newEvent, start, end });
    setFormOpen(true);
  };


  const handleSubmitEvent = () => {
    const { title, start, end, freq } = newEvent;


    const rule = new RRule({
      freq: RRule[freq],
      interval: 1,
      dtstart: start,
      until: new Date(moment(start).add(1, 'month').toDate()), 
    });

    const recurringDates = rule.all(); 

    const recurringEvents = recurringDates.map((date) => ({
      title,
      start: moment(date).tz(userTimeZone).toDate(),
      end: moment(date).tz(userTimeZone).add(moment(end).diff(moment(start), 'hours'), 'hours').toDate(),
    }));

    setEvents([...events, ...recurringEvents]);


    setNewEvent({ title: '', start: null, end: null, freq: 'WEEKLY' });
    setFormOpen(false); 
  };


  const handleFieldChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <DragAndDropCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          resizable
          onEventDrop={handleEventDrop}
          onEventResize={handleEventResize}
          selectable 
          onSelectSlot={handleSelectSlot} 
          style={{ height: 500 }}
        />
      </DndProvider>


      <EventModal
        isOpen={isFormOpen}
        newEvent={newEvent}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmitEvent}
        onClose={() => setFormOpen(false)}
      />
    </div>
  );
};

export default MyCalendar;
