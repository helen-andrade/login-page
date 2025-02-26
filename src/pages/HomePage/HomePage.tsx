import React, { useState } from "react";
import BackgroundImage from "../../assets/backGroundImage.png";
import { Title } from "../../components/Title";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOpenModal = (content: React.SetStateAction<string>) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  return (
    <div className="homePage">
      <div className="containerHomePage">
        <Title />

        <div className="linksHomePage">
          <button className="button">
            <a href="#">INÍCIO</a>
          </button>

          <button className="button" onClick={() => handleOpenModal("SOBRE")}>
            <a href="#">SOBRE</a>
          </button>

          <button className="button" onClick={() => handleOpenModal("CONTATO")}>
            <a href="#">CONTATO</a>
          </button>
        </div>

        <img src={BackgroundImage} alt="Background" />

        {isModalOpen && (
          <div className="modal">
            <div className="modalContent">
              <button className="closeButton" onClick={handleCloseModal}>
              <IoClose />
              </button>
              {modalContent === "SOBRE" && (
                <div className="modalContentAboutUs">
                  <p className="titleModal">Sobre a Entrix</p>
                  <p className="textModal">
                    Na Entrix, nosso objetivo é tornar as suas compras mais
                    práticas e acessíveis. Com uma seleção diversificada de
                    produtos e ofertas exclusivas, trabalhamos para garantir uma
                    experiência de compra fácil, rápida e segura. Valorizamos
                    cada cliente e estamos sempre prontos para oferecer o melhor
                    atendimento, ajudando você a encontrar tudo o que precisa em
                    um só lugar. Bem-vindo à Entrix, onde sua satisfação é nossa
                    prioridade!
                  </p>
                </div>
              )}
              {modalContent === "CONTATO" && (
                <div className="modalContentContacts">
                  <p className="titleModal">Nos contate</p>
                  <p className="socialMidias">
                    <div className="icon">
                      <a
                        href="https://wa.me/77998485611"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                    <div className="icon">
                      <a
                        href="https://instagram.com/helenandrade21"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram />
                      </a>
                    </div>
                    <div className="icon">
                      <a
                        href="https://www.youtube.com/watch?v=1BQmRIMyJBg&list=PLvl0eOhts1OfevhNH0ZcI_ukZ1S_lc3lN&index=7"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaYoutube />
                      </a>
                    </div>
                    <div className="icon">
                      <a
                        href="https://x.com/?lang=pt-br"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter />
                      </a>
                    </div>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;