import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Input } from '../Input';
import { ErrorInput } from '../Input/ErrorInput';
import { Label } from '../Label';

export function FormLogin() {
  return (
    <div className="my-4">
      <h1 className="my-2">Anywhere in your app!</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors: { [key: string]: string } = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log('sfk;jsdhfjksdfjk');
          setTimeout(() => {
            console.log('sfk;jsdhfjksdfjk');
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
                disabled={isSubmitting}
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
