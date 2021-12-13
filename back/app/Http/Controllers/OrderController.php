<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class OrderController extends Controller
{
    public function all()
    {
        return response()->json(Order::all());
    }

    public function search(Request $request)
    {
        $this->validate($request, [
            "search" => ["required", "string"]
        ]);
        return response()->json(
            Order::where('title', 'like', "%" . $request->search . "%")
                ->orWhere('client', 'like', "%" . $request->search . "%")
                ->get()
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
        $editedModel = Order::find($request->id);
        $editedModel->fill($request->except("token"));
        $editedModel->save();
        return response('Updated');
    }

    public function delete(string $orderId)
    {
        Order::findOrFail($orderId)->delete();
        return response('Deleted');
    }
}
