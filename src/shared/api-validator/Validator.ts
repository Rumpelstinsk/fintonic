import mongoose from 'mongoose';

export const objectIdValidator = (value: any, helpers: any) => {
  if (!mongoose.isValidObjectId(value)) {
    return helpers.error('invalid ObjectId');
  }

  return value;
};
