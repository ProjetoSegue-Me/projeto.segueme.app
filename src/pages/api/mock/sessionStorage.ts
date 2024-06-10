type SessionStore = {
    [key: string]: number;
  };
  
  const sessions: SessionStore = {};
  
  export const getSession = (sessionId: string): number | undefined => {
    return sessions[sessionId];
  };
  
  export const setSession = (sessionId: string, expiresAt: number): void => {
    sessions[sessionId] = expiresAt;
  };
  
  export const deleteSession = (sessionId: string): void => {
    delete sessions[sessionId];
  };