import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse/sendResponse';
import { userServices } from './user.service';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
  const reqBody = req.body;
  const result = await userServices.createUserIntoDb(reqBody);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});

const sendEmail = catchAsync(async (req, res) => {
  const reqBody = req.body;

  // Validate required fields
  if (!reqBody.email || !reqBody.firstName || !reqBody.lastName || !reqBody.number || !reqBody.message) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: 'All fields are required',
      data: null,
    });
  }

  const result = await userServices.sendEmailToUser(reqBody);

  if (!result.success) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: result.message,
      data: null,
    });
  }

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result.message,
    data: null,
  });
});

export const usercontroller = {
  createUser,
  sendEmail,
};
