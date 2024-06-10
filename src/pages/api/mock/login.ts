import { NextApiRequest, NextApiResponse } from "next";
import { setSession } from "./sessionStorage";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { login, senha } = req.body;

    if (login === "admin.admin" && senha === "admin") {
      const sessionId = Math.random().toString(36).substr(2);
      const expiresAt = Date.now() + 60 * 60 * 1000;

      setSession(sessionId, expiresAt);

      res.setHeader(
        "Set-Cookie",
        `sessionId=${sessionId}; Path=/; Max-Age=3600`
      );
      return res.status(200).json({ message: "Login realizado com sucesso" });
    }

    return res.status(401).json({ message: "Credenciais invalidas" });
  }

  return res.status(405).json({ message: "Metodo não permitido" });
};
