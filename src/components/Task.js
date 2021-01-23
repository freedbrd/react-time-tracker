import {FaTimes} from 'react-icons/all';

const Task = ({task, onDelete, onToggle}) => {
  return (
      <div className={`task ${task.reminder ? 'reminder' : ''}`}
           onDoubleClick={onToggle.bind(this, task.id)}>
        <h3>
          {task.text}
          <FaTimes onClick={onDelete.bind(this, task.id)}
                   style={{color: 'red', cursor: 'pointer'}}/>
        </h3>
        <p>{task.day}</p>
      </div>
  );
};

export default Task;