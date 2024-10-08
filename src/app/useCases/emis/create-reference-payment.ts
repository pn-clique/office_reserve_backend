import axios from 'axios';
import { errorResponse } from '../../../@shareds/contracts';

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
        "https://pagamento.ao/payment/initiate",
        {
          public_key: "pro_kxi4nvp7mf3rji8ziamngmn9562c7jhxtuwljnndh4n26nk0572",
          identifier: String(identifier),
          currency: 'KZ',
          amount: Number(value),
          gateway_methods: ['MulticaixaExpress'],
          details: plan,
          ipn_url: "https://api-coworking.pnclique.com/callback-office-reserve",
          cancel_url:  'https://coworking.pnclique.com/user',
          success_url: 'https://coworking.pnclique.com/user',
          site_name: 'PN Clique Coworking',
          site_logo: 'https://i.ibb.co/6rw0nGZ/PN.jpg',
          checkout_theme: 'dark',
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
      return errorResponse(err);
    }
  }
}