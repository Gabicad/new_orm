import IFormikError from '../../models/FormikErrors';
export const SetErrorsEvent = Symbol(`SetErrors`);
export const DeleteErrorsEvent = Symbol(`DeleteErrors`);

export const FormikEventKeys = {
  SetErrorsEvent,
  DeleteErrorsEvent
} as const;

export interface FormikEvents {
  [SetErrorsEvent]: IFormikError[];
  [DeleteErrorsEvent]: void;
}
