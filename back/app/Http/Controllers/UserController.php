<?php

namespace App\Http\Controllers;

use App\Mail\AccountCreated;
use App\Models\User;
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

    public function create(Request $request)
    {
        $this->validate($request, [
            "email" => ["required", "email", "unique:users"]
        ]);
        User::create([
            "email" => $request->email,
            "password" => Hash::make(str_random(12))
        ]);
        Mail::to($request->email)->send(new AccountCreated());
        return response('Created', 201);
    }

    public function delete(string $userId)
    {
        if ($userId === (string)auth()->id()) {
            return response('You cannot delete yourself', 403);
        }
        User::findOrFail($userId)->delete();
        return response('Deleted', 200);
    }
}
