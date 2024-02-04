import { useRef } from "react";

export type DeferedPromise<T> = {
  resolve: (value: T) => void;
  reject: (value: unknown) => void;
  promise: Promise<T>;
};

export function useDeferredPromise<T>() {
  const promiseRef = useRef<DeferedPromise<T>>();

  function defer(): DeferedPromise<T> {
    const deferredPromise = {} as DeferedPromise<T>;
    deferredPromise.promise = new Promise((resolve, reject) => {
      deferredPromise.resolve = resolve;
      deferredPromise.reject = reject;
    });

    promiseRef.current = deferredPromise;
    return deferredPromise;
  }

  return { defer, promise: promiseRef.current };
}
