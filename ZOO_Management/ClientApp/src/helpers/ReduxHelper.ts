import { AppState } from "../store/configureStore";
import { initialState as toastMessage } from "../store/toastMessageReducer";

export type ClearAppState = Omit<AppState, "login">;

export const getClearState: () => ClearAppState = () => {
    return {
        toastMessage,
    };
};
