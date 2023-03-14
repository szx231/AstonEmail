import { useForm, Controller } from 'react-hook-form';

import { Input, Button } from 'antd';
import { LockOutlined, UserOutlined, GoogleOutlined } from '@ant-design/icons';

import { Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import { placeholderText, validateRules } from './validateRules';

import { InputErrorMessage } from '../../../components/UI/InputErrorMessage';

import s from './signIn.module.css';

import { signInRequest } from '../../../store/Authorization/SignIn';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { useAthorization } from '../../../hooks/useAthorization';
import { selectSignIn } from '../../../store/Selectors';

interface Data {
  email: string;
  password: string;
}

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectSignIn);

  const { status: statusAuth } = useAthorization();

  if (statusAuth === 'success') return <Navigate to="/Mail" />;

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data: Data) => {
    dispatch(signInRequest(data));

    if (data) {
      reset();
    }
  };

  useEffect(() => {
    if (status === 'success') {
      window.location.reload();
    }
  }, [status]);

  return (
    <div className={s.formContainer}>
      <form className={s.form}>
        <h4 className={s.formTitle}>Авторизация</h4>
        <GoogleOutlined style={{ fontSize: '26px', color: '#1677FF', margin: '0 auto' }} />
        <Controller
          render={({ field }) => (
            <Input
              placeholder={placeholderText.email}
              prefix={<UserOutlined />}
              status={errors.email && 'error'}
              {...field}
            />
          )}
          name="email"
          control={control}
          rules={validateRules.email}
        />
        <InputErrorMessage errors={errors.email} />
        <Controller
          render={({ field }) => (
            <Input.Password
              placeholder={placeholderText.password}
              prefix={<LockOutlined />}
              status={errors.password && 'error'}
              {...field}
            />
          )}
          name="password"
          control={control}
          rules={validateRules.password}
        />
        <InputErrorMessage errors={errors.password} />
        {status === 'loading' ? (
          <Button type="primary" loading disabled>
            Загрузка...
          </Button>
        ) : (
          <Button onClick={handleSubmit(onSubmit)} type="primary">
            Войти
          </Button>
        )}
      </form>
      <Link to="/Authorization/SignUp">
        <Button style={{ width: '100%' }} type="primary">
          Зарегистрировать
        </Button>
      </Link>
    </div>
  );
};

export default SignIn;
