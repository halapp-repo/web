import * as yup from 'yup';

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    creditCardType(errorMessage: string): StringSchema<TType, TContext>;
    creditCardLength(errorMessage: string): StringSchema<TType, TContext>;
  }
}
