import { StatusCodes } from "http-status-codes";
import Task from "../models/task.model";
import { successResponse, errorResponse } from "../utils/response.utils";

export default class TaskService {
  private taskModel = Task;

  async add(body: any, user: any) {
    const task = await this.taskModel.create({
      ...body,
      meta: {
        createdAt: new Date(),
        createdBy: user._id,
      },
    });

    return successResponse(
      StatusCodes.CREATED,
      false,
      "Task created successfully",
      task
    );
  }

  async update(id: string, body: any, user: any) {
    const task = await this.taskModel.findById(id);
    if (!task) {
      return errorResponse(StatusCodes.NOT_FOUND, false, "Task not found");
    }

    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      {
        ...body,
        "meta.updatedAt": new Date(),
        "meta.updatedBy": user._id,
      },
      { new: true }
    );

    return successResponse(
      StatusCodes.OK,
      false,
      "Task updated successfully",
      updatedTask
    );
  }

  async delete(id: string, user: any) {
    const task = await this.taskModel.findByIdAndUpdate(
      id,
      {
        "meta.deletedAt": new Date(),
        "meta.deletedBy": user._id,
      }
    );

    if (!task) {
      return errorResponse(StatusCodes.NOT_FOUND, false, "Task not found");
    }

    return successResponse(StatusCodes.OK, false, "Task deleted successfully");
  }

  async get(id: string) {
    const task = await this.taskModel.findById(id);
    if (!task) {
      return errorResponse(StatusCodes.NOT_FOUND, false, "Task not found");
    }

    return successResponse(
      StatusCodes.OK,
      false,
      "Task found successfully",
      task
    );
  }

  async getAll(query: any) {
    const matchQuery: any = {
      "meta.deletedAt": { $exists: false },
    };

    if (query.search) {
      matchQuery.name = { $regex: query.search, $options: "i" };
    }

    const tasks = await this.taskModel.find(matchQuery).sort({ "meta.createdAt": -1 });

    return successResponse(
      StatusCodes.OK,
      false,
      "Tasks found successfully",
      tasks
    );
  }
}
