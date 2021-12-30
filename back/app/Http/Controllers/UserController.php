<?php

namespace App\Http\Controllers;

use App\Mail\AccountCreated;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Laravel\Lumen\Routing\Controller;

class UserController extends Controller
{
    public function allDeletable()
    {
        return response()->json(User::select(['id', 'email'])->whereNotIn('id', [auth()->user()->id])->get());
    }
    public function allAssignable()
    {
        return response()->json(User::select(['id', 'email'])->get());
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            "email" => ["required", "email", "unique:users"]
        ]);
        $newUser = User::create([
            "email" => $request->email,
            "password" => Hash::make(str_random(12))
        ]);
        Mail::to($request->email)->send(new AccountCreated());

        NotificationService::sendNotificationToAllUsers([
            "content" => "User " . $request->email . " was added",
            "order_id" => null
        ]);
        return response()->json($newUser, 201);
    }

    public function delete(string $userId)
    {
        if ($userId === (string)auth()->id()) {
            return response('You cannot delete yourself', 403);
        }
        $requestedUser =  User::findOrFail($userId);
        $requestedUser->delete();

        NotificationService::sendNotificationToAllUsers([
            "content" => "User " . $requestedUser->email . " was deleted",
            "order_id" => null
        ]);
        return response('Deleted', 200);
    }
}
