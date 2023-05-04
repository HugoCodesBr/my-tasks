import '../../styles/Tasks.scss';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import TaskCreate from './TaskCreate';
import { useEffect, useState } from 'react';

const Tasks = () => {
  const [modal, setModal] = useState(false);
  const [taskData, setTaskData] = useState({ task: '', color: 'default' });
  const storedList = JSON.parse(window.localStorage.getItem('taskList'));
  const [taskList, setTaskList] = useState(storedList || []);

  function handleModal() {
    setModal(!modal);
    setTaskData({ ...taskData, task: '' });
  }

  function taskChange(event) {
    setTaskData({ ...taskData, task: event.target.value });
  }

  function colorChange(event) {
    setTaskData({ ...taskData, color: event.target.id });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTaskList([taskData, ...taskList]);
    handleModal();
  }

  useEffect(() => {
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
              <li className="tasks__item color1">
                <div className="tasks__info">
                  <input type="checkbox" name="option1" id="option1" />
                  <label htmlFor="option1">Essa é uma tarefa</label>
                </div>
                <div className="tasks__options">
                  <AiOutlineEdit />
                  <AiOutlineDelete />
                </div>
              </li>
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
        <button className="tasks__add" onClick={handleModal}>
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
      />
    </>
  );
};

export default Tasks;
