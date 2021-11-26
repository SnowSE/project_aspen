export default class Alert {
    message: string;
    danger: boolean;
    constructor(message: string, danger: boolean) {
        this.message = message ?? "";
        this.danger = danger ?? false;
      }
  }
  