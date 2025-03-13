import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { Button, Form, FormControl, ListGroup } from "react-bootstrap";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
        <ListGroup.Item >
            <Form.Label className="me-2">
                <FormControl className="mb-3 "
                    defaultValue={todo.title}
                    onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} />
            </Form.Label>
            <Button className="me-2 text-black" variant="warning" onClick={() => dispatch(updateTodo(todo))}
                id="wd-update-todo-click"> Update </Button>
            <Button variant="success" onClick={() => dispatch(addTodo(todo))}
                id="wd-add-todo-click"> Add </Button>
        </ListGroup.Item>
    );
}

