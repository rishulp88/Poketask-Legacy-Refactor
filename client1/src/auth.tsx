class Auth {
  authenticated: boolean;

  constructor() {
    this.authenticated = false;
  }

  login(cb: () => void): void {
    this.authenticated = true;
    cb();
  }

  logout(cb: () => void): void {
    this.authenticated = false;
    cb();
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}

export default new Auth();