import { FormEvent, useRef } from "react";

// API conection
import { api } from "../lib/axios";

// Images
import Image from "next/image";
import logoImg from "../assets/logo.svg";
import avataresImg from "../assets/avatares.png";
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import iconCheckImg from "../assets/icon-check.svg";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

const Home = (props: HomeProps) => {
  const poolTitleInput = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/pools", {
        title: poolTitleInput.current?.value,
      });
      const { code } = response.data;
      await navigator.clipboard.writeText(code);
      alert(
        "Bolão criado com sucesso, o código foi copiado para a área de transferência"
      );
      if (poolTitleInput.current) poolTitleInput.current.value = "";
    } catch (err) {
      console.error(err);
      alert("Falha ao criar o bolão, tente novamente");
    }
  };

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid gap-28 grid-cols-2 items-center">
      <main>
        <Image src={logoImg} alt="NLW Copa" quality={100} />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={avataresImg} alt="Avatares" quality={100} />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount}</span> pessoas
            já estão usando
          </strong>
        </div>

        <form onSubmit={onSubmit} className="mt-10 flex gap-2">
          <input
            required
            type={"text"}
            ref={poolTitleInput}
            placeholder="Qual nome do seu bolão?"
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
          />{" "}
          <button
            type="submit"
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="icone de check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="icone de check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo prévial da aplicação movel do NLW Copa"
        quality={100}
      />
    </div>
  );
};

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
};

export default Home;
