'use client';

import { useActionState as useReactActionState } from 'react';
import { toast } from 'sonner';

type ToastMessages = {
  success?: string;
  error?: string;
};

type ActionWithoutPayload<State> = (prevState: State) => State | Promise<State>;

type ActionWithPayload<State, Payload> = (
  prevState: State,
  payload: Payload
) => State | Promise<State>;

function isNextRedirectError(error: unknown): error is { digest: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    typeof (error as { digest: unknown }).digest === 'string' &&
    (error as { digest: string }).digest === 'NEXT_REDIRECT'
  );
}

export function useActionState<State, InitialState extends Awaited<State>>(
  action: ActionWithoutPayload<State>,
  initialState: InitialState,
  permalink?: string,
  toastMessages?: ToastMessages
): [Awaited<State>, () => void, boolean];

export function useActionState<State, InitialState extends Awaited<State>, Payload>(
  action: ActionWithPayload<State, Payload>,
  initialState: InitialState,
  permalink?: string,
  toastMessages?: ToastMessages
): [Awaited<State>, (payload: Payload) => void, boolean];

export function useActionState<State, InitialState extends Awaited<State>, Payload>(
  action: (prevState: State, payload?: Payload) => State | Promise<State>,
  initialState: InitialState,
  permalink?: string,
  toastMessages?: ToastMessages
): [Awaited<State>, (payload?: Payload) => void, boolean] {
  const wrappedAction = async (prevState: State, payload?: Payload): Promise<State> => {
    try {
      const result = await action(prevState, payload);

      const hasErrors =
        typeof result === 'object' &&
        result !== null &&
        'errors' in result &&
        result.errors &&
        Object.values(result.errors).some((v) => (Array.isArray(v) ? v.length > 0 : Boolean(v)));

      if (!hasErrors && toastMessages?.success) {
        toast.success(toastMessages.success);
      }

      if (hasErrors && toastMessages?.error) {
        toast.error(toastMessages.error);
      }

      return result;
    } catch (error: unknown) {
      if (isNextRedirectError(error)) {
        throw error;
      }

      toast.error('Что-то пошло не так');
      console.error(error);
      return prevState;
    }
  };

  const [state, dispatch, isPending] = useReactActionState(wrappedAction, initialState, permalink);

  return [state, dispatch, isPending];
}
