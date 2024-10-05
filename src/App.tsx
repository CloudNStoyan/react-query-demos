import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { JSX } from "react";

interface Todo {
  id: number;
  title: string;
}

const state: { todos: Todo[] } = {
  todos: [{ id: 1, title: "Touch grass" }],
};

const getTodos = async ({ signal }: { signal: AbortSignal }): Promise<Todo[]> =>
  new Promise((resolve) => {
    // eslint-disable-next-line no-console
    console.log("App | getTodos - invoked");

    signal.addEventListener("abort", () => {
      // eslint-disable-next-line no-console
      console.log("App | getTodos was aborted", signal.aborted);
    });

    setTimeout(() => {
      resolve([...state.todos]);
    }, 2000);
  });

const postTodoAlwaysFail = async (_todo: Todo) =>
  new Promise<Todo>((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Failed because stuff"));
    }, 500);
  });

const postTodo = async (todo: Todo) =>
  new Promise<Todo>((resolve) => {
    // eslint-disable-next-line no-console
    console.log("App | postTodo - invoked");

    setTimeout(() => {
      state.todos.push(todo);
      resolve(todo);
    }, 500);
  });

export const App = (): JSX.Element => {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: async () => {
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const optimisticMutation = useMutation({
    mutationFn: postTodo,
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      // Optimistically update to the new value
      queryClient.setQueryData(["todos"], [...previousTodos, newTodo]);

      // Return a context with the previous and new todo
      return { previousTodos, newTodo };
    },
    // If the mutation fails, use the context we returned above
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(["todos"], context!.previousTodos);
    },
    // Always refetch after error or success:
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const optimisticMutationFailure = useMutation({
    mutationFn: postTodoAlwaysFail,
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      // Optimistically update to the new value
      queryClient.setQueryData(["todos"], [...previousTodos, newTodo]);

      // Return a context with the previous and new todo
      return { previousTodos, newTodo };
    },
    // If the mutation fails, use the context we returned above
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(["todos"], context!.previousTodos);
    },
    // Always refetch after error or success:
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div>
      <ul>{data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>

      {isFetching && <div>fetching...</div>}

      {isLoading && <div>loading...</div>}

      {error && <div>{error.message}</div>}

      <button
        type="button"
        onClick={() => {
          void queryClient.cancelQueries({ queryKey: ["todos"] });
        }}
      >
        Cancel Todos Fetching
      </button>

      <button
        type="button"
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: "Do Laundry",
          });
        }}
      >
        Add Todo
      </button>

      <button
        type="button"
        onClick={() => {
          optimisticMutation.mutate({
            id: Date.now(),
            title: "Do Laundry Optimistically",
          });
        }}
      >
        Add Todo Optimistically
      </button>

      <button
        type="button"
        onClick={() => {
          optimisticMutationFailure.mutate({
            id: Date.now(),
            title: "Do Laundry Optimistically That fails",
          });
        }}
      >
        Fail to Add Todo Optimistically
      </button>
    </div>
  );
};
