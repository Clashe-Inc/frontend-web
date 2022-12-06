import Vue from 'vue';

const bus = new Vue();

const dispatch = (eventName: string, obj?: any) => bus.$emit(eventName, obj);

const on = (eventName: string, handler: CallableFunction) => bus.$on(eventName, handler);

const off = (eventName: string, handler: CallableFunction) => bus.$off(eventName, handler);

export default {
  dispatch,
  on,
  off,
};
