import { applyMiddleware, combineReducers, compose, createStore, Reducer } from "redux";
import createSagaMiddleware from "redux-saga";
import { toastMessageReducer as toastMessage, ToastMessageState } from "./toastMessageReducer";

export interface AppState {
    toastMessage: ToastMessageState;
}

const configureStore = (initialState?: AppState) => {
    const appReducer = combineReducers<AppState>({
        toastMessage,
    });

    const rootReducer: Reducer<AppState> = (state, action) => {
        return appReducer(state, action);
    };

    const enhancers = [];
    const windowIfDefined = typeof window === "undefined" ? null : (window as any);
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }

    const sagaMiddleware = createSagaMiddleware();
    const result = createStore(rootReducer, initialState, compose(applyMiddleware(sagaMiddleware), ...enhancers));

    return result;
};

export const store = configureStore();

export type AppDispatch = typeof store.dispatch;
