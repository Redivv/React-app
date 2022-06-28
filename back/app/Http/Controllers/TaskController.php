<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Task;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Laravel\Lumen\Routing\Controller;

class TaskController extends Controller
{
    public function all(string $orderId)
    {
        sleep(10);
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
            'notes' => ["string", "nullable"],
            'files' => ["present", "nullable", "array"],
            'files.*.id' => ["numeric", "exists:files,id"]
        ]);
        $newTask = Task::create($request->except(["token", "files"]));
        $newTask->load("user:id,email");
        $newTask->files()->sync(array_column((array)$request->get("files"), "id"));
        $newTask->load("files:id,original_filename");
        $assignedUser = $newTask->user()->first();
        if ($assignedUser && $assignedUser != auth()->user()) {
            NotificationService::sendNotificationToSingleUser($assignedUser, [
                "content" => "User " . auth()->user()->email . " assigned you to " . $newTask->title,
                "order_id" => $orderId
            ]);
        }
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
            'user_id' => ["integer", "nullable", "exists:users,id"],
            'title' => ["required", "string"],
            'column_number' => ["required", "integer", "min:0", "max:3"],
            'description' => ["string", "nullable"],
            'validation_terms' => ["required", "string"],
            'validation_terms' => ["string", "nullable"],
            'notes' => ["string", "nullable"],
            'files' => ["present", "nullable", "array"],
            'files.*.id' => ["numeric", "exists:files,id"]
        ]);
        $editedModel = Task::find($request->id);
        $originalUser = $editedModel->user()->first();
        $editedModel->fill($request->except(["token", "files"]));
        $editedModel->save();
        $editedUser = $editedModel->user()->first();
        if ($originalUser && $originalUser != auth()->user()) {
            NotificationService::sendNotificationToSingleUser($originalUser, [
                "content" => "User " . auth()->user()->email . " edited your task - " . $editedModel->title,
                "order_id" => $orderId
            ]);
        }
        if ($editedUser && $originalUser != $editedUser && $editedUser != auth()->user()) {
            NotificationService::sendNotificationToSingleUser($editedUser, [
                "content" => "User " . auth()->user()->email . " assigned you to " . $editedModel->title,
                "order_id" => $orderId
            ]);
        }

        $editedModel->load("user:id,email");
        $editedModel->files()->sync((array)array_column($request->get("files"), "id"));
        $editedModel->load("files:id,original_filename");
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
