const Twilio = require('twilio');

const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

class Sms {

  private option = {
    body: '',
    from: process.env.TWILIO_PHONE_SENDER,
    to: '',
  };

  /**
   * generate goole map link based on latitude and longitude
   * @param latitude 
   * @param longitude 
   */
  private buildMapLink(latitude: string, longitude: string) {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  }
  /**
   * build sms content to send
   * @param drug_name 
   * @param latitude 
   * @param longitude 
   */
  buildSmsContent(drug_name: string, latitude: string, longitude: string) {
    const mapLink = this.buildMapLink(latitude, longitude);
    this.option.body = `Take a ${drug_name} medication to ${mapLink}`;
    return this;
  }

  sendTo(phone_number: string): Promise<boolean> {
    this.option.to = phone_number;
    return new Promise((res, rej) => {
      client.messages
      .create(this.option)
      .then((msg: any) => {
        res(msg.sid ? true : false);
      })
      .catch((err: any) => {
        rej(err.message);
      })
    })
  }

}

export default new Sms;