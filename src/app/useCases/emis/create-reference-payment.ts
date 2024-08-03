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
      const generateReference = await axios.post(
        `${process.env.PAYMENT_REFERENCE_URL}`,
        {
          public_key: `${process.env.PAYMENT_REFERENCE_API_KEY}`,
          identifier: String(identifier),
          currency: 'KZ',
          amount: Number(value),
          gateway_methods: ['MulticaixaExpress'],
          details: plan,
          // ipn_url: `${process.env.BASE_URL}callback-above`,
          ipn_url: `${process.env.API_URL}/callback`,
          cancel_url: 'http://example.com/cancel_url.php',
          success_url: 'http://example.com/success_url.php',
          site_name: 'PITEU',
          site_logo:
            'https://bc.piteu.ao/storage/business/2022-12-15-639a5e85b410d.png',
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