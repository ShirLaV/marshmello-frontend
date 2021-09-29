import { BsCheckBox } from 'react-icons/bs';


export function CardChecklists({ checklists }) {
  const getChecklistStr = () => {
    let todosCount = 0;
    let doneTodosCount = 0;
    checklists.forEach((checklist) => {
      checklist.todos.forEach((todo) => {
        todosCount++;
        if (todo.isDone) doneTodosCount++;
      });
    });
    return doneTodosCount + '/' + todosCount;
  };
  return (
    <div className='checklist-box flex align-center'>
      <BsCheckBox />
      <span>{getChecklistStr()}</span>
    </div>
  );
}
