import { ref } from "vue";
const bus = ref(new Map());

export default function useEventsBus() {
  function emit(event: any, ...args: any) {
    bus.value.set(event, args);
  }

  return {
    emit,
    bus,
  };
}
