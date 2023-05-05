import '../../styles/Tasks.scss';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import TaskCreate from './TaskCreate';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Tasks = () => {
  const [modal, setModal] = useState(false);
  const storedList = JSON.parse(window.localStorage.getItem('taskList'));
  const [taskData, setTaskData] = useState({
    task: '',
    color: 'default',
    id: '',
    done: false,
  });
  const [taskList, setTaskList] = useState(storedList || []);
  const [edit, setEdit] = useState(false);
  const [currentId, setCurrentId] = useState('');

  function handleModal(id) {
    setModal(!modal);
    setTaskData({ ...taskData, task: '' });
    if (id !== 'task-add') {
      setEdit(true);
      setCurrentId(id);
    } else {
      setEdit(false);
    }
  }

  function taskChange(event) {
    setTaskData({ ...taskData, task: event.target.value });
  }

  function colorChange(event) {
    setTaskData({ ...taskData, color: event.target.id });
  }

  function removeTask(id) {
    const newList = taskList.filter((task) => task.id !== id);
    setTaskList(newList);
  }

  function handleSubmit(event, id) {
    event.preventDefault();
    if (id !== '') {
      const updateTasks = taskList.map((task) => {
        if (task.id === id) {
          return { ...task, task: taskData.task, color: taskData.color };
        }
        return task;
      });
      setTaskList(updateTasks);
    } else {
      setTaskList([taskData, ...taskList]);
    }
    handleModal();
  }

  useEffect(() => {
    const newId = uuidv4();
    setTaskData({
      ...taskData,
      id: newId,
    });
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);

  return (
    <>
      <div className="tasks">
        <h2>Minhas Tarefas</h2>
        <div className="tasks__content">
          <div className="tasks__todo">
            <h3>Incompletas</h3>
            <ul>
              {taskList.length > 0 ? (
                taskList.map((item) => (
                  <li key={item.task} className={`tasks__item ${item.color}`}>
                    <div className="tasks__info">
                      <input type="checkbox" name={item.id} id={item.id} />
                      <label htmlFor={item.id}>{item.task}</label>
                    </div>
                    <div className="tasks__options">
                      <AiOutlineEdit onClick={() => handleModal(item.id)} />
                      <AiOutlineDelete onClick={() => removeTask(item.id)} />
                    </div>
                  </li>
                ))
              ) : (
                <p className="tasks__empty">
                  Você não adicionou nenhuma tarefa.
                </p>
              )}
            </ul>
          </div>
          <div className="tasks__done">
            <h3>Completas</h3>
            <ul>
              <li className="tasks__item color-1">
                <div className="tasks__info">
                  <input type="checkbox" name="option4" id="option4" />
                  <label htmlFor="option4">Essa é uma tarefa</label>
                </div>
                <div className="tasks__options">
                  <AiOutlineEdit />
                  <AiOutlineDelete />
                </div>
              </li>
              <li className="tasks__item color-1">
                <div className="tasks__info">
                  <input type="checkbox" name="option5" id="option5" />
                  <label htmlFor="option5">Essa é uma tarefa</label>
                </div>
                <div className="tasks__options">
                  <AiOutlineEdit />
                  <AiOutlineDelete />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <button
          className="tasks__add"
          onClick={() => {
            handleModal('task-add');
          }}
        >
          <AiOutlinePlus />
        </button>
      </div>
      <TaskCreate
        modal={modal}
        handleModal={handleModal}
        taskData={taskData}
        taskChange={taskChange}
        colorChange={colorChange}
        handleSubmit={handleSubmit}
        edit={edit}
        currentId={currentId}
      />
    </>
  );
};

export default Tasks;
