import { Input } from '../components/Atoms'
import { FaUserAlt, FaEnvelope, FaLock } from 'react-icons/fa'
import { Button, Link } from '../components/Atoms'
import { RegisterHero, Modal } from '../components/Organisms'
import { useRegister } from '../hooks/RegisterPage/logic'
import { FaDollarSign } from 'react-icons/fa'

const Register = () => {
  const { register, handleSubmit, doRegister, errors, mutation, goLogin } =
    useRegister()

  return (
    <>
      <RegisterHero />
      <form
        onSubmit={handleSubmit(doRegister)}
        className="flex min-h-[calc((100vh/8)*7)] flex-col justify-between p-[30px]"
      >
        <div>
          <Input
            label="Email"
            type="email"
            startIcon={FaEnvelope}
            placeholder="Email"
            {...register('email')}
            errors={errors}
          />
          <Input
            label="Nombre"
            startIcon={FaUserAlt}
            placeholder="Jose"
            {...register('name')}
            errors={errors}
          />
          <Input
            label="Apellido"
            startIcon={FaUserAlt}
            placeholder="Garzon"
            {...register('lastname')}
            errors={errors}
          />
          <Input
            label="Contraseña"
            startIcon={FaLock}
            placeholder="Contraseña"
            type="password"
            {...register('password')}
            errors={errors}
          />
          <Input
            label="Confirmar contraseña"
            startIcon={FaLock}
            placeholder="Confirmar contraseña"
            type="password"
            {...register('confirm_password')}
            errors={errors}
          />
        </div>
        <div className="text-center">
          <Button className="mb-2" disabled={mutation.isLoading}>
            Registrar
          </Button>
          <Link className="text-sm font-bold" to="/login">
            Ya tengo una cuenta
          </Link>
        </div>
      </form>
      <Modal title="¡Exito!" close={goLogin} open={mutation.isSuccess}>
        <div className="my-10">
          <p>
            Has creado tú cuenta, ya puedes comenzar a registrar tus finanzas!
          </p>
          <FaDollarSign className="mx-auto mt-3 shrink-0 text-6xl text-slate-700" />
        </div>
        <Button onClick={goLogin}>Login</Button>
      </Modal>
    </>
  )
}

export default Register
