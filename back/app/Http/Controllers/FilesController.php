<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class FilesController extends Controller
{
    public function upload(Request $request)
    {
        $this->validate($request, [
            "attachments" => ["required", "array"],
            "attachments.*" => ["file", "mimes:doc,docx,pdf,jpg,png,jpeg,txt", "max:5000"]
        ]);
        $response = [];
        foreach ($request->file("attachments") as $file) {
            $filename = md5_file($file->getRealPath()) . '.' . $file->extension();
            if ($dbFile = File::where("filename", $filename)->first()) {
                $response[] = [
                    "id" => $dbFile->id,
                    "original_filename" => $dbFile->original_filename
                ];
                continue;
            }
            $file->storeAs('attachments', $filename);
            $dbFile = File::create([
                "filename" => $filename,
                "original_filename" => $file->getClientOriginalName()
            ]);
            $response[] = [
                "id" => $dbFile->id,
                "original_filename" => $dbFile->original_filename
            ];
        }
        return response()->json($response);
    }
}
