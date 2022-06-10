import { ObjectId } from 'mongodb';
import { Schema, model, Document } from 'mongoose';
import { Product } from '../../../domain';

export const ENTITY_NAME = 'product';

export const ProductSchema: Schema = new Schema(
  {
    name: { required: true, type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

export interface IProduct extends Document, Omit<Product, '_id'> {
  _id: ObjectId;
}

export const ProductModel = model<IProduct>(ENTITY_NAME, ProductSchema);
