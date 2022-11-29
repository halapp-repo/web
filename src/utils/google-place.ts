import axios from 'axios';

interface GooglePlaceOutput {
  County: string;
  City: string;
  ZipCode: string;
}

class GooglePlace {
  googleApiKey: string;
  constructor() {
    const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    if (!googleApiKey) {
      throw new Error('ApiKey is missing');
    }
    this.googleApiKey = googleApiKey;
  }
  async getAddressInfo(streetLine: string): Promise<GooglePlaceOutput> {
    return new Promise((resolve, reject) => {
      axios
        .get(`/findplacefromtext/json`, {
          baseURL: 'https://maps.googleapis.com/maps/api/place',
          params: {
            input: streetLine,
            fields: 'formatted_address',
            key: this.googleApiKey,
            inputtype: 'textquery'
          }
        })
        .then((response) => {
          const {
            data: { candidates }
          } = response;
          if (!candidates || candidates.length === 0) {
            reject('no data');
          }
          const formattedAddress = candidates[0]['formatted_address'];

          resolve({
            County: 'xx',
            City: 'xx',
            ZipCode: 'xx'
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const googlePlace = new GooglePlace();
export default googlePlace;
