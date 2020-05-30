import { Action as ReduxAction } from "redux";

export interface Action<T = {}> extends ReduxAction<string> {
  payload?: T;
}
