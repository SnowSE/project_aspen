import { QueryClient } from "@tanstack/react-query"
import toast, { ErrorIcon } from "react-hot-toast"


const addErrorAsToast = async (error: any) => {
  console.log(error);
  const message = error.response?.data.detail
    ? error.response?.data.detail
      ? `${error.response?.data.detail}`
      : `Error With Request`
    : typeof error === "string"
      ? error
      : JSON.stringify(error);

  toast(
    (t: any) => (
      <div className="row">
        <div className="col-auto my-auto">
          <ErrorIcon />
        </div>
        <div className="col my-auto"> {message}</div>
        <div className="col-auto my-auto">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="btn btn-outline-secondary py-1"
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
      </div>
    ),
    {
      duration: Infinity,
    }
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: addErrorAsToast,
      retry: 0,
    },
    mutations: {
      onError: addErrorAsToast,
      retry: 0,
    }
  }
})

export const getQueryClient = () => {
  return queryClient;
}
