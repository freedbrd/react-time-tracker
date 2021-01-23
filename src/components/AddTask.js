import {useState} from 'react';

const AddTask = ({onAdd}) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert('Add Task');

      return;
    }

    onAdd({
      id: new Date().getTime(),
      text,
      day,
      reminder,
    });

    setDay('');
    setText('');
    setReminder(false);
  };

  return (
      <form className='add-form'
            onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="add-task">Task</label>
          <input id='add-task'
                 type="text"
                 value={text}
                 onChange={(e) => setText(e.target.value)}
                 placeholder='Add Task'/>
        </div>
        <div className="form-control">
          <label htmlFor="add-day">Day & Time</label>
          <input id='add-day'
                 type="text"
                 value={day}
                 onChange={(e) => setDay(e.target.value)}
                 placeholder='Add Day & Time'/>
        </div>
        <div className="form-control form-control-check">
          <label htmlFor="add-reminder">Set Reminder</label>
          <input id='add-reminder'
                 checked={reminder}
                 onChange={(e) => setReminder(e.target.checked)}
                 type="checkbox"/>
        </div>

        <button className='btn btn-block'
                type='submit'>Save Task
        </button>
      </form>
  );
};

export default AddTask;