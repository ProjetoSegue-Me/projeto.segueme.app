import { NextApiRequest, NextApiResponse } from "next";
import { deleteSession, getSession } from "./sessionStorage";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const cookie = req.headers.cookie;
    const sessionId = cookie
      ?.split(";")
      .find((row) => row.startsWith("sessionId="))
      ?.split("=")[1];
    if (sessionId) {
      deleteSession(sessionId);
      res.setHeader("Set-Cookie", "sessionId=; Path=/; Max-Age=0");
      return res.status(200).json({ message: "Logout realizado com sucesso" });
    }

    return res.status(400).json({ message: `Sessão inativa: ${sessionId}`  });
  }

  return res.status(405).json({ message: "Metodo não permitido" });
};
