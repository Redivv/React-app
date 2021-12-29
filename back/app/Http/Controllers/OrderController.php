<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Order;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class OrderController extends Controller
{
    public function all()
    {
        return response()->json(Order::whereNull("archived_at")->orderBy("shipping_deadline", "asc")->get());
    }

    public function search(Request $request)
    {
        $this->validate($request, [
            "search" => ["nullable", "string"],
            "archive" => ["present", "boolean"]
        ]);
        $searchResults = Order::query();
        if ($request->search) {
            if (is_numeric($request->search)) {
                $searchResults = $searchResults->where("id", $request->search);
            } else {
                $searchResults =
                    $searchResults->where(function ($query) use ($request) {
                        $query->where('title', 'like', "%" . $request->search . "%")
                            ->orWhere('client', 'like', "%" . $request->search . "%");
                    });
            }
        }
        $searchResults = ((bool)$request->archive ?
            $searchResults->whereNotNull("archived_at") :
            $searchResults->whereNull("archived_at"));
        return response()->json(
            $searchResults->orderBy("shipping_deadline", "asc")->get()
        );
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'title' => ["required", "string"],
            'client' => ["required", "string"],
            'shipping_address' => ["required", "string"],
            'shipping_deadline' => ["required", "date"],
            'notes' => ["present", "string", "nullable"],
            'files' => ["present", "nullable", "array"],
            'files.*.id' => ["numeric", "exists:files,id"]
        ]);
        $newOrder = Order::create($request->except(["token", "files"]));
        $newOrder->files()->sync(array_column((array)$request->get("files"), "id"));
        NotificationService::sendNotificationToAllUsers([
            "content" => "A new order has been created. " . $newOrder->client . " due on " . $newOrder->shipping_deadline,
            "order_id" => $newOrder->id
        ]);
        return response()->json(["name" => $newOrder->id], 201);
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'id' => ["required", "numeric", "exists:orders"],
            'title' => ["required", "string"],
            'client' => ["required", "string"],
            'shipping_address' => ["required", "string"],
            'shipping_deadline' => ["required", "date"],
            'notes' => ["present", "string", "nullable"],
            'files' => ["present", "nullable", "array"],
            "files.*.id" => ["numeric", "exists:files,id"]
        ]);
        $editedModel = Order::where('id', $request->id)->whereNull("archived_at")->first();
        $editedModel->fill($request->except(["token", "files"]));
        $editedModel->save();
        $editedModel->files()->sync(array_column($request->get("files"), "id"));
        return response('Updated');
    }

    public function delete(string $orderId)
    {
        Order::where('id', $orderId)->whereNull("archived_at")->first()->delete();
        return response('Deleted');
    }

    public function archive(string $orderId)
    {
        Order::where('id', $orderId)->whereNull("archived_at")->first()->archive();
        return response('Archived');
    }

    public function unArchive(string $orderId)
    {
        Order::where('id', $orderId)->whereNotNull("archived_at")->first()->unArchive();
        return response('Archived');
    }
}
