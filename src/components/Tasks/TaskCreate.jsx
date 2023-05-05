import { useEffect, useState } from 'react';
import '../../styles/TaskCreate.scss';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

const TaskCreate = ({
  modal,
  handleModal,
  taskData,
  taskChange,
  colorChange,
  handleSubmit,
  edit,
  currentId,
}) => {
  return (
    <div className={`task-create ${modal ? 'active' : ''}`}>
      <div className="create__bg" onClick={handleModal}></div>
      <form
        onSubmit={(event) => handleSubmit(event, currentId)}
        className="create__card"
      >
        {edit ? <h2>Editar tarefa</h2> : <h2>Criar tarefa</h2>}
        <div className="create__content">
          <label htmlFor="task">Descreva a tarefa:</label>
          <input
            type="text"
            name="task"
            id="task"
            value={taskData.task}
            onChange={taskChange}
          />
          <label htmlFor="color">Escolha uma cor (opcional)</label>
          <div className="create__colors">
            <input
              type="radio"
              name="color"
              id="color1"
              onInput={colorChange}
            />
            <label htmlFor="color1"></label>
            <input
              type="radio"
              name="color"
              id="color2"
              onInput={colorChange}
            />
            <label htmlFor="color2"></label>
            <input
              type="radio"
              name="color"
              id="color3"
              onInput={colorChange}
            />
            <label htmlFor="color3"></label>
            <input
              type="radio"
              name="color"
              id="color4"
              onInput={colorChange}
            />
            <label htmlFor="color4"></label>
          </div>
        </div>
        <div className="create__buttons">
          <div className="create__cancel" onClick={handleModal}>
            <AiOutlineClose />
          </div>
          <button type="submit" className="create__confirm">
            <AiOutlineCheck />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskCreate;
