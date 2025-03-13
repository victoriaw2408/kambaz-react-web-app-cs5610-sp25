import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { Button, Form, ListGroup } from "react-bootstrap";
export default function TodoItem({ todo }: {
    todo: { id: string; title: string };
}) {
    const dispatch = useDispatch();

    return (
        <ListGroup.Item key={todo.id} >

            <Form.Label className="me-2 ">
                {todo.title}
            </Form.Label>
            <Button className="me-2" variant="danger" onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click"> Delete </Button>
            <Button onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click"> Edit </Button>
        </ListGroup.Item>);
}


