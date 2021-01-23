import {BrowserRouter as Router, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      setTasks(
          await fetchTasks(),
      );
    };

    getTasks();
  }, []);

  // Fetch Data From JSON Server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    return await res.json();
  };

  // Add Task
  const addTask = async (task) => {
    const data = await fetch(
        `http://localhost:5000/tasks/`,
        {
          method: 'post',
          body: JSON.stringify(task),
          headers: {
            'Content-Type': 'application/json',
          },
        },
    );

    setTasks([
      ...tasks,
      await data.json(),
    ]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'delete'});

    setTasks(
        tasks.filter(task => task.id !== id),
    );
  };

  // Reminder Toggler
  const toggleReminder = async (id) => {
    const taskToToggle = tasks.find(task => task.id === id);

    const data = await fetch(
        `http://localhost:5000/tasks/${id}`,
        {
          method: 'put',
          body: JSON.stringify(
              {
                ...taskToToggle,
                reminder: !taskToToggle.reminder,
              },
          ),
          headers: {
            'Content-Type': 'application/json',
          },
        },
    );

    const updateTask = await data.json();

    setTasks(
        tasks.map(task => {
          return task.id === updateTask.id
              ? {...task, reminder: updateTask.reminder}
              : task;
        }),
    );
  };

  return (
      <Router>
        <div className="container">
          <Header text={showAddTask ? 'Hide' : 'Add'}
                  onShow={setShowAddTask.bind(this, !showAddTask)}/>

          <Route path='/'
                 exact
                 render={(props) => (
                     <>
                       {
                         showAddTask && <AddTask onAdd={addTask}/>
                       }
                       <Tasks onDelete={deleteTask}
                              onToggle={toggleReminder}
                              tasks={tasks}/>
                     </>
                 )}/>
          <Route path='/about'
                 component={About}/>
          <Footer/>
        </div>
      </Router>
  );
}

export default App;
