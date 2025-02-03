import { Link } from "react-router-dom";
import "../../App.css";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../../components/Title";
import * as yup from "yup";
import { Title } from "../../components/Title";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<Boolean>(false);

  const userSchema = yup.object().shape({
    email: yup
      .string()
      .required("O campo email é obrigatório")
      .min(5, "O email deve conter no mínimo 5 caracteres")
      .max(255, "O email deve ter no máximo 255 caracteres")
      .email("Informe um email válido"),
    password: yup
      .string()
      .required("O campo de senha é obrigatório")
      .min(8, "A senha deve conter no mínimo 8 caracteres")
      .max(120, "A senha deve conter no máximo 120 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\?])/,
        "A senha deve conter ao menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial, e ter no mínimo 8 caracteres."
      ),
  });

  async function loginCompleted(
    _event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    _event.preventDefault();
    try {
      const user = { email, password };
      await userSchema.validate(user);
      toast.success("Login bem-sucedido!");
      navigate("/HomePage");
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        toast.error(error.errors[0]);
      } else {
        toast.error("Ocorreu um erro ao fazer login.");
      }
    }
  }
  function handleSubmitForgotPassword(
    _event: React.MouseEvent<HTMLAnchorElement>
  ): void {
    navigate("/ForgotPassword");
  }

  return (
    <div className="container">
      <Title />
      <h2>Login</h2>
      <form onSubmit={loginCompleted}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            className="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Senha:</label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            className="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="buttonVisibility"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? <IoMdEyeOff /> : <IoMdEye />}
          </button>
        </div>

        <button type="submit" className="button">
          Login
        </button>
      </form>

      <div className="links">
        <a href="#" onClick={handleSubmitForgotPassword}>
          Esqueceu a senha?
        </a>
        <Link to="/Register">Novo por aqui? Cadastre-se</Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
