import toast from "react-hot-toast";
import { QueryClient } from "react-query";

//const url = 'https://localhost:44478/aspen/new/api/teams/3';
//const addErrorAsToast = async (error: any) => {
//    if (error.isAxiosError) {
//        const message = error.response?.data.detail
//            ? `${error.response?.data.detail}`
//            : `Error With Request`;
//        toast.error(message);
//    } else {
//        toast.error(JSON.stringify(error));
//    }
//};
//const queryClient = new QueryClient({
//    defaultOptions: {
//        queries: {
//            refetchOnWindowFocus: false,
//            onError: addErrorAsToast,
//        },
//        mutations: {
//            onError: addErrorAsToast,
//        },
//    },
//});
//export const getQueryClient = () => {
//    return queryClient;
//};

