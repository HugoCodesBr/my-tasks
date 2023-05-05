import '../../styles/Tasks.scss';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import TaskCreate from './TaskCreate';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Tasks = () => {
  const [modal, setModal] = useState(false);
  const storedList = JSON.parse(window.localStorage.getItem('taskList'));
  const storedDone = JSON.parse(window.localStorage.getItem('doneList'));
  const [taskData, setTaskData] = useState({
    task: '',
    color: '',
    id: '',
    done: false,
  });
  const [taskList, setTaskList] = useState(storedList || []);
  const [edit, setEdit] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [doneList, setDoneList] = useState(storedDone || []);

  function handleModal(id) {
    const colorsInputs = document.querySelectorAll('.create__colors input');
    colorsInputs.forEach((radio) => {
      radio.checked = false;
    });
    setModal(!modal);
    setTaskData({ ...taskData, task: '', color: '' });

    if (id !== 'task-add') {
      const copyTask = taskList
        .filter((task) => task.id === id)
        .map((task) => task.task);

      setEdit(true);
      setCurrentId(id);
      setTaskData({ ...taskData, task: copyTask });
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
    const newDoneList = doneList.filter((task) => task.id !== id);
    setTaskList(newList);
    setDoneList(newDoneList);
  }

  function handleSubmit(event, id) {
    event.preventDefault();
    if (id) {
      const updateTasks = taskList.map((task) => {
        if (task.id === id && task.task !== taskData.task) {
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

  function handleDone(event, id) {
    taskList.map((task) => {
      if (task.id === id && event.target.checked) {
        task.done = true;
        setDoneList([task, ...doneList]);
      } else if (task.id === id && event.target.checked === false) {
        task.done = false;
        setDoneList([task, ...doneList]);
      }
    });
    const newList = taskList.filter((task) => task.done !== true);
    setTaskList(newList);
  }

  function handleUndone(event, id) {
    const undoneItem = doneList.filter((task) => task.id === event.target.id);
    const newDoneList = doneList.filter((task) => task.id !== event.target.id);
    doneList.map((task) => {
      if (task.id === id && event.target.checked) {
        task.done = true;
        setDoneList([task, ...doneList]);
      } else if (task.id === id && event.target.checked === false) {
        task.done = false;
        setDoneList([task, ...doneList]);
      }
    });
    setTaskList([undoneItem[0], ...taskList]);
    setDoneList(newDoneList);
  }

  useEffect(() => {
    const newId = uuidv4();
    setTaskData({
      ...taskData,
      id: newId,
    });
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
    window.localStorage.setItem('doneList', JSON.stringify(doneList));
  }, [taskList, doneList]);

  return (
    <>
      <div className="tasks">
        <h2>Minhas Tarefas</h2>
        <div className="tasks__content">
          <div className="tasks__todo">
            <h3>A Fazer</h3>
            <ul>
              {taskList.length > 0 ? (
                taskList.map((item) => (
                  <li
                    key={'undone' + item.task}
                    className={`tasks__item ${item.color}`}
                  >
                    <div className="tasks__info">
                      <input
                        type="checkbox"
                        name={item.id}
                        id={item.id}
                        onChange={(event) => handleDone(event, item.id)}
                      />
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
            <h3>Concluídas</h3>
            <ul>
              {doneList.length > 0 ? (
                doneList.map((item) => (
                  <li
                    key={'done' + item.task}
                    className={`tasks__item ${item.color}`}
                  >
                    <div className="tasks__info">
                      <input
                        type="checkbox"
                        name={item.id}
                        id={item.id}
                        checked
                        onChange={(event) => handleUndone(event, item.id)}
                      />
                      <label htmlFor={item.id}>{item.task}</label>
                    </div>
                    <div className="tasks__options">
                      <AiOutlineEdit onClick={() => handleModal(item.id)} />
                      <AiOutlineDelete onClick={() => removeTask(item.id)} />
                    </div>
                  </li>
                ))
              ) : (
                <p className="tasks__empty">Nenhuma tarefa concluída.</p>
              )}
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
