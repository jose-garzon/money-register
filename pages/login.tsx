import { Hero } from '../components/Hero'
import { Input } from '../components/Input'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { LoadingButton } from '../components/Button'
import { Link } from '../components/Link'
import { useLogin } from '../hooks/LoginPage/logic'
import { GoogleButton } from '../components/Button/GoogleButton'

const Login = () => {
  const { register, handleSubmit, doLogin, errors, loading, doGoogleLogin } =
    useLogin()

  return (
    <>
      <Hero />
      <form
        onSubmit={handleSubmit(doLogin)}
        className="flex min-h-[calc((100vh/3)*2)] flex-col justify-between  p-[30px]"
      >
        <div>
          <h1 className=" text-6xl font-bold">Hola,</h1>
          <p>ingresa con tu cuenta</p>
        </div>
        <div>
          <Input
            placeholder="Email"
            label="Email"
            type="email"
            id="login-email"
            startIcon={FaEnvelope}
            errors={errors}
            {...register('email')}
          />
          <Input
            placeholder="Contraseña"
            label="Contraseña"
            id="login-password"
            type="password"
            startIcon={FaLock}
            errors={errors}
            {...register('password')}
          />
        </div>
        <div className="text-center">
          <LoadingButton isLoading={loading} className="mb-2">
            Ingresar
          </LoadingButton>
          <GoogleButton onClick={doGoogleLogin} />
          <small className="text-sm">¿No tienes una cuenta?</small>{' '}
          <Link className="text-sm font-bold" to="/registro">
            Regístrate
          </Link>
        </div>
      </form>
    </>
  )
}

export default Login
