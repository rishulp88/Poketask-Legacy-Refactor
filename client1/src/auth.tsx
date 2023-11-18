type Callback = () => void;

class Auth {
  private authenticated: boolean;

  constructor() {
    this.authenticated = false;
  }

  login(cb: Callback): void {
    this.authenticated = true;
    cb();
  }

  logout(cb: Callback): void {
    this.authenticated = false;
    cb();
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}

export default new Auth();
