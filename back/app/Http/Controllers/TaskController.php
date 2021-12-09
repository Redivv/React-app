<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Task;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class TaskController extends Controller
{
    public function all(string $orderId)
    {
        return response()->json(Order::findOrFail($orderId)->tasks());
    }

    public function create(Request $request, string $orderId)
    {
        $request->merge(["order_id" => $orderId]);
        $this->validate($request, [
            'order_id' => ["exists:orders,id"],
            'title' => ["required", "string"],
            'column_number' => ["required", "integer", "min:0", "max:3"],
            'description' => ["string", "nullable"],
            'validation_terms' => ["required", "string"],
            'validation_terms' => ["string", "nullable"],
            'notes' => ["string", "nullable"]
        ]);
        $newTask = Task::create($request->except("token"));
        return response()->json(["name" => $newTask->id], 201);
    }


    public function update(Request $request, string $orderId)
    {
        $request->merge(["order_id" => $orderId]);
        $this->validate($request, [
            'id' => ["required", "numeric", "exists:tasks"],
            'order_id' => ["exists:orders,id"],
            'title' => ["required", "string"],
            'column_number' => ["required", "integer", "min:0", "max:3"],
            'description' => ["string", "nullable"],
            'validation_terms' => ["required", "string"],
            'validation_terms' => ["string", "nullable"],
            'notes' => ["string", "nullable"]
        ]);
        $editedModel = Task::find($request->id);
        $editedModel->fill($request->except("token"));
        $editedModel->save();
        return response('Updated');
    }

    public function updateColumn(Request $request, string $orderId, string $taskId)
    {
        $request->merge(["id" => $taskId]);
        $request->merge(["order_id" => $orderId]);
        $this->validate($request, [
            'id' => ["required", "numeric", "exists:tasks"],
            'order_id' => ["exists:orders,id"],
            'column_number' => ["required", "integer", "min:0", "max:3"],
        ]);
        $editedModel = Task::find($request->id);
        $editedModel->column_number = $request->column_number;
        $editedModel->save();

        return response('Updated');
    }

    public function delete(string $orderId, string $taskId)
    {
        Task::findOrFail($taskId)->delete();
        return response('Deleted');
    }
}
