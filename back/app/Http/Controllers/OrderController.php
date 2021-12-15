<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class OrderController extends Controller
{
    public function all()
    {
        return response()->json(Order::whereNull("archived_at")->get());
    }

    public function search(Request $request)
    {
        $this->validate($request, [
            "search" => ["nullable", "string"],
            "archive" => ["present", "boolean"]
        ]);
        $searchResults = Order::query();
        if ($request->search) {
            $searchResults =
                $searchResults->where(function ($query) use ($request) {
                    $query->where('title', 'like', "%" . $request->search . "%")
                        ->orWhere('client', 'like', "%" . $request->search . "%");
                });
        }
        $searchResults = ((bool)$request->archive ?
            $searchResults->whereNotNull("archived_at") :
            $searchResults->whereNull("archived_at"));
        return response()->json(
            $searchResults->get()
        );
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'title' => ["required", "string"],
            'client' => ["required", "string"],
            'shipping_address' => ["required", "string"],
            'shipping_deadline' => ["required", "date"],
            'notes' => ["string", "nullable"]
        ]);
        $newOrder = Order::create($request->except("token"));
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
            'notes' => ["string", "nullable"]
        ]);
        $editedModel = Order::where('id', $request->id)->whereNull("archived_at")->first();
        $editedModel->fill($request->except("token"));
        $editedModel->save();
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
