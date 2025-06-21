// import { sendEmail } from '../../utilities/sendEmail';
// import { sendEmailWithSendGrid } from '../../utilities/sendWithSendGrid';
import { sendEmail } from '../../utilities/sendEmail';
import { sendEmailWithSendGrid } from '../../utilities/sendWithSendGrid';
import { Tuser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = async (data: Tuser) => {
  const result = await User.create(data);

  return result;
};
const sendEmailToUser = async (data: Tuser) => {
  const result = await sendEmail(data);

  return result;
};

export const userServices = {
  createUserIntoDb,
  sendEmailToUser
};
