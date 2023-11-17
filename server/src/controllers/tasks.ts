import { Request, Response } from 'express';

interface User {
  tasks: any[];
  points: number;
  save: () => void;
}

interface RequestWithUser extends Request {
  user: User;
}

const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = req.body;
    const user = (req as RequestWithUser).user;
    const tasks = await user.tasks;
    tasks.push(task);
    user.save();
    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).send({error, message: 'could not add task'});
  }
}


const remove = async(req: Request, res: Response): Promise<void> => {
  try {
    const taskToRemove = req.body;
    let id = taskToRemove.index;
    const user = (req as RequestWithUser).user;
    const tasks = await user.tasks;

    for (let task of tasks){
      if (task.index === id){
        let taskId = tasks.indexOf(task);
        tasks.splice(taskId, 1);
      }
    }
    user.save();
    res.sendStatus(200);

  } catch (error: any) {
    console.log(error)
    res.status(500).send({error, message: 'could not delete task'});
  }
}

const check = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskToCheck = req.body;
    let id = taskToCheck.index;
    const user = (req as RequestWithUser).user;
    const tasks = await user.tasks;
    const taskChecked = [];

    for (let task of tasks){
      if (task.index === id){
        const check = task.done;
        if (check === true) {
          task.done = false;
          user.points -= 2;
        };
        if (check === false){
          task.done = true;
          user.points += 2;
        };
        taskChecked.push(task);
      }
    }
    user.save();
    res.status(201).send(taskChecked);
  } catch (error: any) {
    console.log(error)
    res.status(500).send({error, message: 'could not check task'});
  }
}

const isChecked = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskToCheck = req.body;
    let id = taskToCheck.index;
    const user = (req as RequestWithUser).user;
    const tasks = await user.tasks;
    let result: boolean | undefined;

    for (let task of tasks){
      if (task.index === id){
        const check = task.done;
        result = check;
      }
    }
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error)
    res.status(500).send({error, message: 'could not check task'});
  }
}

export { isChecked, check, remove, add };