// import { useIsFetching } from "@tanstack/react-query";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutations";
import { useTodos, useTodosIds } from "../services/queries";

import { SubmitHandler, useForm } from "react-hook-form";
import { Todo } from "../types/todo";

export default function Todos() {
  const todosIdQuery = useTodosIds();

  const todoQueries = useTodos(todosIdQuery.data);

  //! Xem đã fetch bao nhiêu lần
  //   const isFetching = useIsFetching();

  //   if (todosIdQuery.isPending) {
  //     return <span>Loading...</span>;
  //   }

  //   if (todosIdQuery.isError) {
  //     return <span>There is an error</span>;
  //   }

  //   ? sử dụng mutation

  const { register, handleSubmit } = useForm<Todo>();

  const createTodoMutation = useCreateTodo();
  const handleCreateTodo: SubmitHandler<Todo> = (data: Todo) => {
    createTodoMutation.mutate(data);
  };

  //? update todo
  const updateTodoMutation = useUpdateTodo();

  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true });
    }
  };

  const deleteTodoMutation = useDeleteTodo();

  const handleDeleteTodo = async (id: number) => {
    await deleteTodoMutation.mutateAsync(id);
  };

  return (
    <>
      {/* <p>Query function status {todosIdQuery.fetchStatus}</p>
      <p>Query data status {todosIdQuery.status}</p>
      <p>Global is Fetching : {isFetching}</p> */}

      <form onSubmit={handleSubmit(handleCreateTodo)}>
        <h4>New todo :</h4>
        <input placeholder="title" {...register("title")} />
        <br />
        <input placeholder="description" {...register("description")} />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? "Creating..." : "Create todo"}
        />
      </form>

      {/* {todosIdQuery.data?.map((id) => (
        <p key={id}>id : {id}</p>
      ))} */}

      {/*? làm thế nào để fetch từng cái  */}
      <ul>
        {todoQueries.map(({ data }, index) => (
          <li key={index}>
            <div>
              ID : {data?.id}
              <span>
                <strong>Title:</strong> {data?.title} {""}
                <strong>Description:</strong> {data?.description}
              </span>
            </div>
            <div>
              <button
                onClick={() => handleMarkAsDoneSubmit(data)}
                disabled={data?.checked}
              >
                {data?.checked ? "Done" : "Mark as done"}
              </button>
              {data && data.id && (
                <button onClick={() => handleDeleteTodo(data.id!)}>
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
