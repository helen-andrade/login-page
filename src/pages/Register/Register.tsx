import { FormEvent, useState } from "react";
import "../../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Title } from "../../components/Title";
import InputMask from "react-input-mask";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import ButtonBack from "../../components/ButtonBack";

const NewLogin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const userSchema = yup.object().shape({
    name: yup
      .string()
      .required("O campo de nome é obrigatório")
      .min(3, "O nome deve conter no mínimo 3 caracteres")
      .max(120, "O nome deve ter no máximo 120 caracteres")
      .matches(/^[A-Za-z\s]+$/, "Apenas letras são permitidas"),
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
    whatsapp: yup
      .string()
      .required("O campo de whatsapp é obrigatório")
      .min(14, "Informe um número válido")
      .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Informe um número válido"),
  });

  async function handleSubmit(
    _event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    _event.preventDefault();
    try {
      const user = { name, email, password, whatsapp };

      await userSchema.validate(user);
      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/"), 6000);
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        toast.error(error.errors[0]);
      } else {
        toast.error("Ocorreu um erro ao fazer login.");
      }
    }
  }

  return (
    <div className="container">
      <ButtonBack />
      <form onSubmit={handleSubmit}>
        <Title />
        <h2>Crie seu cadastro</h2>

        <div className="formGrup">
          <label htmlFor="name">Nome completo:</label>
          <input
            type="text"
            name="name"
            className="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="formGrup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="formGrup">
          <label htmlFor="password">Senha:</label>
          <div className="passwordWrapper">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              className="password"
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
        </div>

        <div className="formGrup">
          <label htmlFor="whatsapp">Whatsapp:</label>
          <InputMask
            mask="(99) 99999-9999"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            type="text"
            name="whatsapp"
            className="whatsapp"
          />
        </div>

        <div className="submit">
          <button type="submit" className="button">
            Enviar
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NewLogin;
