<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Laravel\Lumen\Routing\Controller;

class TaskController extends Controller
{
    public function all(string $orderId)
    {
        return response()->json(
            Order::findOrFail($orderId)
                ->tasks()
                ->orderBy(
                    "created_at",
                    "desc"
                )->get()
        );
    }

    public function create(Request $request, string $orderId)
    {
        $request->merge(["order_id" => $orderId]);
        $this->validate($request, [
            'order_id' => ["integer", Rule::exists("orders", "id")->where(function ($query) {
                return $query->whereNull("archived_at");
            })],
            'user_id' => ["integer", "nullable", "exists:users,id"],
            'title' => ["required", "string"],
            'column_number' => ["required", "integer", "min:0", "max:3"],
            'description' => ["string", "nullable"],
            'validation_terms' => ["required", "string"],
            'validation_terms' => ["string", "nullable"],
            'notes' => ["string", "nullable"]
        ]);
        $newTask = Task::create($request->except("token"));
        $newTask->load("user:id,email");
        return response()->json($newTask);
    }


    public function update(Request $request, string $orderId)
    {
        $request->merge(["order_id" => $orderId]);
        $this->validate($request, [
            'id' => ["required", "numeric", "exists:tasks"],
            'order_id' => ["integer", Rule::exists("orders", "id")->where(function ($query) {
                return $query->whereNull("archived_at");
            })],
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
        $editedModel->load("user:id,email");
        return response()->json($editedModel);
    }

    public function updateColumn(Request $request, string $orderId, string $taskId)
    {
        $request->merge(["id" => $taskId]);
        $request->merge(["order_id" => $orderId]);
        $this->validate($request, [
            'id' => ["required", "numeric", "exists:tasks"],
            'order_id' => ["integer", Rule::exists("orders", "id")->where(function ($query) {
                return $query->whereNull("archived_at");
            })],
            'column_number' => ["required", "integer", "min:0", "max:3"],
        ]);
        $editedModel = Task::find($request->id);
        $editedModel->column_number = $request->column_number;
        $editedModel->save();

        return response('Updated');
    }

    public function delete(Request $request, string $orderId, string $taskId)
    {
        $request->merge(["id" => $taskId]);
        $request->merge(["order_id" => $orderId]);
        $this->validate($request, [
            'id' => ["required", "numeric", "exists:tasks"],
            'order_id' => ["integer", Rule::exists("orders", "id")->where(function ($query) {
                return $query->whereNull("archived_at");
            })],
        ]);
        Task::find($taskId)->delete();
        return response('Deleted');
    }
}
