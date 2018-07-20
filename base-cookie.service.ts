import { CookieService } from 'ngx-cookie-service';

export class BaseCookieService {

  private encodeRounds = 5;
  namespace = `common`;

  constructor(
    public cookieService: CookieService
  ) { }

  encode(data) {
    try {
      let jsonify = JSON.stringify(data);
      let encoded = jsonify;

      for (let i = 0; i < this.encodeRounds; i++) {
        encoded = window.btoa(encoded);
      }

      return encoded;
    } catch (e) {
      console.log('Encoding failed!, ', e.message);

      return null;
    }
  }

  decode(data) {
    try {
      let decoded = data;

      for (let i = 0; i < this.encodeRounds; i++) {
        decoded = window.atob(decoded);
      }

      let jsonparse = JSON.parse(decoded);

      return jsonparse;
    } catch (e) {
      console.log('Decoding failed!, ', e.message);

      return null;
    }
  }

  key(key) {
    return `${this.namespace}.${key}`;
  }

  get(key) {
    try {
      return this.decode(
        this.cookieService.get(this.key(key))
      );
    } catch (e) {
      console.log(`Getting key ${this.key(key)} failed!, `, e.message);

      return null;
    }
  }

  save(key, data) {
    try {
      return this.cookieService.set(
        this.key(key), 
        this.encode(data)
      );
    } catch (e) {
      console.log(`Saving key ${this.key(key)} failed!, `, e.message);

      return null;
    }
  }
}
