import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Title } from "../../components/Title";
import ButtonBack from "../../components/ButtonBack";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const userSchema = yup.object().shape({
    email: yup
      .string()
      .required("O campo email é obrigatório")
      .min(5, "O email deve conter no mínimo 5 caracteres")
      .max(255, "O email deve ter no máximo 255 caracteres")
      .email("Informe um email válido"),
  });

  async function sendEmail(_event: FormEvent<HTMLFormElement>): Promise<void> {
    _event.preventDefault();
    try {
      const user = {
        email,
      };

      await userSchema.validate(user);

      toast.success("Você receberá um email em breve para redefinir sua senha");
      setTimeout(() => {
        navigate("/");
      }, 6000);
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        toast.error(error.errors[0]);
      } else {
        toast.error("Ocorreu um erro inesperado.");
      }
    }
  }

  return (
    <div>
      <form className="container containerPassword" onSubmit={sendEmail}>
        <Title />
        <ButtonBack />
        <h2>Atualizar senha</h2>
        <label>Digite seu email para redefinir sua senha:</label>
        <input
          type="text"
          className="inputPassword"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="button">
          Enviar por email
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default ForgotPassword;
