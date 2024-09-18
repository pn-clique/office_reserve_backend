import axios from 'axios';

interface IEmisRequestProps {
  value: number;
  plan: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  identifier: string;
}

export class EmisIntegrationService {
  async generatePaymentReference(input: IEmisRequestProps) {
    try {
      const {
        value,
        plan,
        firstName,
        lastName,
        email,
        mobile,
        identifier,
      } = input;

      console.log(input);
      const generateReference = await axios.post(
        `${process.env.PAYMENT_REFERENCE_URL}`,
        {
          public_key: `${process.env.PAYMENT_REFERENCE_API_KEY}`,
          identifier: String(identifier),
          currency: 'KZ',
          amount: Number(value),
          gateway_methods: ['MulticaixaExpress'],
          details: plan,
          ipn_url: `${process.env.API_URL}/callback`,
          cancel_url:  'http://localhost:3001/user', //'http://example.com/cancel_url.php',
          success_url: 'http://localhost:3001/user', // 'http://example.com/success_url.php',
          site_name: 'PN Clique Coworking',
          site_logo: 'https://storage.googleapis.com/biskato-557d0.appspot.com/1724294737826.jpeg',
          checkout_theme: 'light',
          customer: {
            first_name: firstName,
            last_name: lastName,
            email,
            mobile,
          },
          shipping_info: {
            address_one: '',
            address_two: '',
            area: '',
            city: '',
            sub_city: '',
            state: '',
            postcode: '',
            country: '',
            others: '',
          },
          billing_info: {
            address_one: '',
            address_two: '',
            area: '',
            city: '',
            sub_city: '',
            state: '',
            postcode: '',
            country: '',
            others: '',
          },
        },
      );

      if (generateReference.status !== 200) {
        throw new Error(generateReference.statusText);
      }

      return generateReference.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}