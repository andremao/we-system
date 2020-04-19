import { Reducer } from 'umi';

export interface ModalState {}

export interface ModelType {
  namespace: string;
  state: ModalState;
  reducers: {
    save: Reducer<ModalState>;
  };
  effects: {};
}

const Model: ModelType = {
  namespace: 'department',
  state: {},
  effects: {},
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
