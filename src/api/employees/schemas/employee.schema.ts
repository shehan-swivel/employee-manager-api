import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop({ required: true, minlength: 3, maxlength: 10 })
  firstName: string;

  @Prop({ required: true, minlength: 3, maxlength: 10 })
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: number;

  @Prop({ enum: ['M', 'F', ''] })
  gender: string;

  @Prop()
  photo: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
