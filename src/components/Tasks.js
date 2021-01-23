import Task from './Task';

const Tasks = ({tasks, onDelete, onToggle}) => {
  return (
      <>
        {
          tasks.length
              ? tasks.map((task) => (
                  <Task key={task.id}
                        onDelete={onDelete}
                        onToggle={onToggle}
                        task={task}/>))
              : 'No Tasks To Show'
        }
      </>
  );
};

export default Tasks;