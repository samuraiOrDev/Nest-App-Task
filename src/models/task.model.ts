import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}
@Schema()
export class Task extends Document {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  description: string;

  @Prop({
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.PENDING,
  })
  status: boolean;
}
export const TaskSchema = SchemaFactory.createForClass(Task);

/* 
  - @Prop() decorator is used to define the schema property.
  - @Schema() decorator is used to define the schema.
  - @SchemaFactory.createForClass() is used to generate the schema.
*/
