import { useSelector } from "react-redux";
export default function todos() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    return (
    <div id="wd-todos">
      <h3>To Dos</h3>
      <h4>{todo}</h4> <hr />
    </div>
  );
}
