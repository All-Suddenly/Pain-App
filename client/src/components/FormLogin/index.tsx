import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useLoginMutation } from '../../hooks';
import { LoginSchema } from '../../validations';
import { Input } from '../Input';
import { ErrorInput } from '../Input/ErrorInput';
import { Label } from '../Label';

export function FormLogin() {
  const { mutate, data, isSuccess, isLoading, isError, error } =
    useLoginMutation();

  return (
    <div className="my-4">
      <h1 className="my-2">Anywhere in your app!</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          const { email } = values;

          mutate(email, {
            onSettled: () => setSubmitting(false),
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {isError && <div>{error?.message}</div>}
            {isSuccess && <div>{JSON.stringify(data)}</div>}
            <Label>
              <div>Email</div>
              <Field type="email" name="email" as={Input} />
            </Label>
            <ErrorMessage name="email" component={ErrorInput} />
            <Label>
              <div>Password</div>
              <Field type="password" name="password" as={Input} />
            </Label>
            <ErrorMessage name="password" component={ErrorInput} />
            <div className="my-4">
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="px-4 py-2 text-white bg-black border"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
